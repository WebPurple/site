const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const strategyConf = require('./../../conf/passport').strategies.local;
const UserSchema = require('./../../schemas/user.schema');

const User = mongoose.model('users', UserSchema);

module.exports = (app, passport) => {
    passport.use('local', new LocalStrategy({ usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email, password: strategyConf.hashPassword(password) })
                .select('-password')
                .lean()
                .exec()
                .then(user => {
                    if (!user) {
                        return done(new Error('Email and Password are invalid'));
                    }
                    return done(null, user);
                })
                .catch(error => done(error));
        }));

    app.post('/auth/login', passport.authenticate('local'), (request, response) => response.json({ success: true }));

    app.post('/auth/register', (request, response) => {
        User.findOne({ email: request.body.email })
            .select('_id')
            .lean()
            .exec()
            .then(doc => {
                if (doc) {
                    return response.status(500).json({ message: 'This email is already taken' });
                }
                const userData = Object.assign(request.body, { password: strategyConf.hashPassword(request.body.password) });
                return new User(userData).save().then(() => response.json({ success: true }));
            })
            .catch(error => response.status(500).json(error));
    });
};
