var mongoose = require('mongoose');
var VkStrategy = require('passport-vkontakte').Strategy;

var passportConf = require('./../../conf/passport');
var UserSchema = require('./../../schemas/user.schema');
var User = mongoose.model('users', UserSchema);

module.exports = (app, passport) => {
    passport.use('vkontakte', new VkStrategy(passportConf.strategies.vk,
        (accessToken, refreshToken, profile, done) => User.findOne({vkUserId: profile.id})
            .then(doc => {
                if (!doc) {
                    return new User({
                        gender: profile.gender,
                        vkUserId: profile.id,
                        vkUserName: profile.username,
                        vkDisplayName: profile.displayName,
                        vkProfileUrl: profile.profileUrl,
                        vkPhotoUrl: profile.photos[0].value
                    }).save();
                }
                return doc;
            })
            .then(doc => done(null, doc))
            .catch(err => done(new Error('Something went wrong')))
    ));

    app.get('/auth/vk', passport.authenticate('vkontakte', {
        scope: ['email']
    }));
    app.get('/auth/vk/callback', passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/login.html'
    }));
};