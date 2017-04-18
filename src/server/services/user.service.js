const mongoose = require('mongoose');
const userSchema = require('./../schemas/user.schema');

const User = mongoose.model('users', userSchema);

const createUser = user => (new User(user)).save();

const getUser = id => User.findById(id).lean().exec();

const getUsers = () => User.find().lean().exec();

const updateUser = (id, user) => User.findById(id).exec()
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

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUsers,
};
