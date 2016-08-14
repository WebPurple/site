const passport = require('passport');

const vkStategyFonf = require('./auth/vk.strategy.conf');
const fbStategyFonf = require('./auth/fb.strategy.conf');

module.exports = (app) => {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    app.use(passport.initialize());
    app.use(passport.session());

    vkStategyFonf(app, passport);
    fbStategyFonf(app, passport);
};
