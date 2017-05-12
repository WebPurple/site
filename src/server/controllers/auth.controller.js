const passport = require('passport');
const mongoose = require('mongoose');

const vkStrategyConf = require('./auth/vk.strategy.conf');
const fbStrategyConf = require('./auth/fb.strategy.conf');
const localStrategyConf = require('./auth/local.strategy.conf');

const UserSchema = require('./../schemas/user.schema');

const User = mongoose.model('users', UserSchema);

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(
        (id, done) => User.findById(id)
            .select('-password')
            .lean()
            .exec((error, user) => done(error, user))
    );

    app.use(passport.initialize());
    app.use(passport.session());

    vkStrategyConf(app, passport);
    fbStrategyConf(app, passport);
    localStrategyConf(app, passport);

    app.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
};
