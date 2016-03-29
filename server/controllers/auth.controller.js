var passport = require('passport');

var vkStategyFonf = require('./auth/vk.strategy.conf');
var fbStategyFonf = require('./auth/fb.strategy.conf');

module.exports = (app) => {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    app.use(passport.initialize());
    app.use(passport.session());

    vkStategyFonf(app, passport);
    fbStategyFonf(app, passport);
};