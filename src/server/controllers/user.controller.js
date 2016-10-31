const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('./../schemas/user.schema');

const securityUtils = require('./../utils/security-utils');
const commonUtils = require('./../../utils/common-utils');

const User = mongoose.model('users', userSchema);

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/user')
        // get current user
        .get((request, response) => response.send(request.user));

    router.route('/users')
        // get all users
        .get((request, response) => User.find().lean().exec()
            .then(users => response.send(users)));

    router.route('/users/:user_id')
        // get user by id
        .get((request, response) => User.findById(request.params.user_id).lean().exec()
            .then(user => response.send(user))
            .catch(err => response.send(err)))
        // update user
        .put(securityUtils.checkPermissions(),
        (request, response) => {
            User.findById(request.params.user_id).exec()
                .then(userToUpdate => {
                    const { user } = request;
                    const { displayName, email, roles } = request.body;
                    /* eslint-disable no-param-reassign */
                    if (displayName) {
                        userToUpdate.displayName = request.body.displayName;
                    }
                    if (email) {
                        userToUpdate.email = email;
                    }
                    if (commonUtils.isAdmin(user) && roles) {
                        userToUpdate.roles = roles;
                    }
                    /* eslint-enable no-param-reassign */
                    return userToUpdate.save();
                })
                .then(user => response.send(user))
                .catch(err => response.send(err));
        });

    router.route('/roles')
        .get((request, response) => response.send(['admin', 'editor']));

    return router;
};
