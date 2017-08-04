const passport = require('passport');

const vkStrategyConf = require('./auth/vk.strategy.conf');
const fbStrategyConf = require('./auth/fb.strategy.conf');
const localStrategyConf = require('./auth/local.strategy.conf');

const { getUser } = require('./../services/user.service');

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(
        (id, done) => getUser(id)
            .then(user => done(null, user))
            .catch(error => done(error))
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
