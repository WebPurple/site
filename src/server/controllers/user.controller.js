const express = require('express');

const userService = require('./../services/user.service');

const securityUtils = require('./../utils/security-utils');
const commonUtils = require('./../../utils/common-utils');

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/user')
        // get current user
        .get((request, response) => response.send(request.user));

    router.route('/users')
        // get all users
        .get((request, response) => userService.getUsers()
            .then(users => response.send(users)));

    router.route('/users/:user_id')
        // get user by id
        .get((request, response) => userService.getUser(request.params.user_id)
            .then(user => response.send(user))
            .catch(err => response.send(err)))
        // update user
        .put(securityUtils.checkPermissions(),
            (request, response) => {
                const { user: loggedUser } = request;
                const userToUpdateId = request.params.user_id;

                // admin can edit any profile, any other user - only his one
                ((commonUtils.isAdmin(loggedUser) || loggedUser._id === userToUpdateId)
                    ? Promise.resolve()
                    : Promise.reject({ message: 'You can\'t edit this profile.' }))

                    .then(() => userService.updateUser(userToUpdateId, request.body)
                        .then(user => response.send(user))
                        .catch(err => response.send(err)));
            });

    router.route('/roles')
        .get((request, response) => response.send(['admin', 'editor']));

    return router;
};
