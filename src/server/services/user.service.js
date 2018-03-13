const mongoose = require('mongoose');
const userSchema = require('./../schemas/user.schema');
const strategyConf = require('./../conf/passport').strategies.local;

const User = mongoose.model('users', userSchema);

const createUser = user => (new User(user)).save();

const getUser = id => User.findById(id).select('-password').lean().exec();

const getUsers = () => User.find().select('-password').lean().exec();

const updateUser = (id, user) => User.findById(id).select('-password').exec()
    .then(userToUpdate => {
        const { displayName, email, roles } = user;
        /* eslint-disable no-param-reassign */
        if (displayName) {
            userToUpdate.displayName = displayName;
        }
        if (email) {
            userToUpdate.email = email;
        }
        if (roles) {
            userToUpdate.roles = roles;
        }
        /* eslint-enable no-param-reassign */
        return userToUpdate.save();
    });

const registerUser = data => User
    .findOne({ email: data.email })
    .select('_id')
    .lean()
    .exec()
    .then(doc => {
        if (doc) {
            throw new Error('This email is already taken');
        }
        return Object.assign({}, data, { password: strategyConf.hashPassword(data.password) });
    })
    .then(userData => User.create(userData))
    .then(user => Object.assign({}, user._doc, { password: undefined }));

const checkUser = (email, pwd) => User
    .findOne({ email })
    .lean()
    .exec()
    .then(user => {
        if (!user) {
            throw new Error('There are no user with this email');
        }
        return user;
    })
    .then(user => {
        if (!strategyConf.checkPassword(pwd, user.password)) {
            throw new Error('Password is invalid');
        }
        return Object.assign({}, user, { password: undefined });
    });

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUsers,
    registerUser,
    checkUser,
};
