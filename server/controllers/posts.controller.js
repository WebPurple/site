var express = require('express');
var mongoose = require('mongoose');

var postSchema = require('./../schemas/post.schema');
var Post = mongoose.model('posts', postSchema);

var appConf = require('./../conf/app.conf');
var facebook = require('./../services/facebook.service');

module.exports = () => {
    var router = express.Router();

    router.route('/posts')
        // add new post
        .post(checkPermissions,
            (request, response) => {
                var postMessage = request.body.text;
                //TODO: Promise.all should be used for all social networks
                var postPromise = Promise.resolve();

                if (request.body.exportToFacebook) {
                    postPromise = postPromise
                        .then(() => getFacebookPageAccessToken(request, appConf.facebookPageId))
                        .then(fbPageAccessToken => facebook.addPost(fbPageAccessToken, postMessage))
                }

                // only if we managed to share our post in all social networks, we save it locally
                postPromise.then(fbPost => {
                        return new Post({
                            text: postMessage,
                            date: new Date(),
                            author: request.user._id,
                            fbPostId: fbPost && fbPost.id
                        }).save()
                    })
                    .then(post => Post.populate(post, 'author'))
                    .then(post => response.send(post))
                    .catch(err => response.send(err));
            })
        // get all posts
        .get((request, response) => Post.find()
            .sort('-date')
            .populate('author')
            .exec()
            .then(post => response.send(post))
            .catch(err => response.send(err)));

    router.route('/posts/:post_id')
        // get post by id
        .get((request, response) => Post.findById(request.params.post_id)
            .populate('author')
            .exec()
            .then(post => response.send(post))
            .catch(err => response.send(err)))
        // update post
        .put(checkPermissions,
            (request, response) => {
                Post.findById(request.params.post_id).exec()
                    .then(post => {
                        post.text = request.body.text;
                        post.author = request.body.author;
                        return post.save();
                    })
                    .then(post => response.send(post))
                    .catch(err => response.send(err))
            })
        .delete(checkPermissions,
            (request, response) => Post.remove({_id: request.params.post_id})
                .then(post => response.send(post))
                .catch(err => response.send(err)));

    return router;
};

function checkPermissions(request, response, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(403);
        response.send({error: 'Access denied'})
    }
}

function getFacebookPageAccessToken(request, pageId) {
    var fbPageAccessToken = request.session.fbPageAccessTokens && request.session.fbPageAccessTokens[pageId];

    return fbPageAccessToken ? Promise.resolve(fbPageAccessToken)
        : facebook.getPageAccessToken(request.user.fbAccessToken, pageId)
        .then(fbPageAccessToken => {
            request.session.fbPageAccessTokens = request.session.fbPageAccessTokens || {};
            return request.session.fbPageAccessTokens[pageId] = fbPageAccessToken
        })
}