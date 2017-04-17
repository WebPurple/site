const mongoose = require('mongoose');
const userSchema = require('./../schemas/user.schema');

const User = mongoose.model('users', userSchema);

function createUser(user) {
    return new User(user).save();
}

module.exports = {
    createUser,
};
