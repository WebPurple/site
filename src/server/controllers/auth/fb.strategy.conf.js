const mongoose = require('mongoose');
const FbStrategy = require('passport-facebook').Strategy;

const passportConf = require('./../../conf/passport');
const UserSchema = require('./../../schemas/user.schema');

const facebook = require('./../../services/facebook.service');

const User = mongoose.model('users', UserSchema);

module.exports = (app, passport) => {
    let longLiveAccessToken;
    const fbConf = passportConf.strategies.fb;

    if (!fbConf.clientID) {
        return;
    }

    passport.use('facebook', new FbStrategy(fbConf,
        (accessToken, refreshToken, profile, done) => facebook.getLongLiveAccessToken(accessToken, fbConf.clientID, fbConf.clientSecret)
            .then(longLiveToken => {
                longLiveAccessToken = longLiveToken;
                return User.findOne({ fbUserId: profile.id });
            })
            .then(doc => {
                if (!doc) {
                    return new User({
                        displayName: profile.displayName,
                        fbUserId: profile.id,
                        longLiveAccessToken,
                        email: profile.email,
                    }).save();
                }
                doc.longLiveAccessToken = longLiveAccessToken; // eslint-disable-line no-param-reassign
                return doc.save();
            })
            .then(user => done(null, user))
            .catch(err => done(new Error('Something went wrong: ' + err))) // eslint-disable-line prefer-template
    ));

    app.get('/auth/fb', passport.authenticate('facebook', {
        scope: ['email', 'manage_pages', 'publish_pages'],
    }));
    app.get('/auth/fb/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login.html',
    }));
};
