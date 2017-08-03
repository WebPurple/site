const LocalStrategy = require('passport-local').Strategy;

const { registerUser, checkUser } = require('./../../services/user.service');

const registerLocalPassport = passport => passport
    .use(
        'local',
        new LocalStrategy(
            { usernameField: 'email' },
            (email, password, done) => checkUser(email, password)
                .then(user => done(null, user))
                .catch(error => done(error))
        )
    );

module.exports = (app, passport) => {
    registerLocalPassport(passport);

    app.post(
        '/auth/login',
        passport.authenticate('local'),
        (request, response) => response.json(request.user)
    );

    app.post(
        '/auth/register',
        (request, response) => registerUser(request.body)
            .then(user => response.json(user))
            .catch(error => response.status(500).send(error))
    );
};
