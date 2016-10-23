const passport = require('passport');

const vkStrategyConf = require('./auth/vk.strategy.conf');
const fbStrategyConf = require('./auth/fb.strategy.conf');

module.exports = (app) => {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    app.use(passport.initialize());
    app.use(passport.session());

    vkStrategyConf(app, passport);
    fbStrategyConf(app, passport);
};
