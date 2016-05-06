var express = require('express');
var mongoose = require('mongoose');

var userSchema = require('./../schemas/user.schema');
var User = mongoose.model('users', userSchema);

var securityUtils = require('./../utils/security-utils');

module.exports = () => {
    var router = express.Router();

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
                        user.displayName = request.body.displayName;
                        user.email = request.body.email;
                        return user.save();
                    })
                    .then(user => response.send(user))
                    .catch(err => response.send(err))
            });

    return router;
};