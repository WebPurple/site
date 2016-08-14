const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('./../schemas/user.schema');

const securityUtils = require('./../utils/security-utils');

const User = mongoose.model('users', userSchema);

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/user')
        // get current user
        .get((request, response) => response.send(request.user));

    router.route('/users')
        // get all users
        .get((request, response) => User.find().exec()
            .then(users => response.send(users)));

    router.route('/users/:user_id')
        // get user by id
        .get((request, response) => User.findById(request.params.user_id).exec()
            .then(user => response.send(user))
            .catch(err => response.send(err)))
        // update user
        .put(securityUtils.checkPermissions,
        (request, response) => {
            User.findById(request.params.user_id).exec()
                .then(user => {
                    /* eslint-disable no-param-reassign */
                    user.displayName = request.body.displayName;
                    user.email = request.body.email;
                    /* eslint-enable no-param-reassign */
                    return user.save();
                })
                .then(user => response.send(user))
                .catch(err => response.send(err));
        });

    return router;
};
