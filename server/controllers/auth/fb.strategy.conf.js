var mongoose = require('mongoose');
var FbStrategy = require('passport-facebook').Strategy;

var passportConf = require('./../../conf/passport');
var UserSchema = require('./../../schemas/user.schema');
var User = mongoose.model('users', UserSchema);

module.exports = (app, passport) => {
    passport.use('facebook', new FbStrategy(passportConf.strategies.fb,
        (accessToken, refreshToken, profile, done) => User.findOne({fbUserId: profile.id})
            .then(doc => {
                if (!doc) {
                    return new User({
                        displayName: profile.displayName,
                        fbUserId: profile.id,
                        email: profile.email
                    }).save();
                }
                return doc;
            })
            .then(doc => {
                var user = doc.toObject();
                user.fbAccessToken = accessToken;
                done(null, user);
            })
            .catch(err => done(new Error('Something went wrong')))
    ));

    app.get('/auth/fb', passport.authenticate('facebook', {
        scope: ['email', 'manage_pages', 'publish_pages']
    }));
    app.get('/auth/fb/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login.html'
    }));
};