const express = require('express');
const mongoose = require('mongoose');

const postSchema = require('./../schemas/post.schema');

const appConf = require('./../conf/app.conf');
const facebook = require('./../services/facebook.service');

const securityUtils = require('./../utils/security-utils');
const commonUtils = require('./../../utils/common-utils');

const Post = mongoose.model('posts', postSchema);

module.exports = () => {
    const router = express.Router(); // eslint-disable-line new-cap

    router.route('/posts')
        // add new post
        .post(securityUtils.checkPermissions(),
        (request, response) => {
            const {
                url,
                title,
                description,
                comment,
                image,
                suggest,
                exportToFacebook,
            } = request.body;
            // TODO: Promise.all should be used for all social networks
            let postPromise = Promise.resolve();

            if (exportToFacebook) {
                postPromise = postPromise
                    .then(() => getFacebookPageAccessToken(request, appConf.facebookPageId))
                    .then(fbPageAccessToken => facebook.addPost(fbPageAccessToken, appConf.facebookPageId, comment || url, url));
            }

            // only if we managed to share our post in all social networks, we save it locally
            postPromise.then(fbPost => new Post({
                url,
                title,
                description,
                comment,
                image,
                type: suggest ? 'suggest' : undefined,
                date: new Date(),
                author: request.user._id,
                fbPostId: fbPost && fbPost.id,
            }).save())
                .then(post => Post.populate(post, 'author'))
                .then(post => response.send(post))
                .catch(err => response.send(err));
        })
        // get all posts
        .get((request, response) => {
            // by default normal (not suggested) posts should be returned
            Post.find({ type: request.query.type ? request.query.type : null })
                .sort('-date')
                .populate('author')
                .exec()
                .then(post => response.send(post))
                .catch(err => response.send(err));
        });

    router.route('/posts/:post_id')
        // get post by id
        .get((request, response) => Post.findById(request.params.post_id)
            .populate('author')
            .exec()
            .then(post => response.send(post))
            .catch(err => response.send(err)))
        // update post
        .put(securityUtils.checkPermissions(), // TODO change "check" according to editing logic
        (request, response) => {
            Post.findById(request.params.post_id).exec()
                .then(post => {
                    /* eslint-disable no-param-reassign */
                    post.text = request.body.text;
                    post.imageLink = request.body.imageLink;
                    /* eslint-enable no-param-reassign */
                    return post.save();
                })
                .then(post => response.send(post))
                .catch(err => response.send(err));
        })
        .delete(securityUtils.checkPermissions(),
            (request, response) => Post.findById(request.params.post_id)
                .then(post => {
                    const user = request.user;
                    if (commonUtils.isAdmin(user) || (commonUtils.isEditor(user) && post.author.equals(user._id))) {
                        post.remove(error => {
                            if (error) {
                                response.status(500)
                                    .json(error);
                            } else {
                                response.json(post);
                            }
                        });
                    } else {
                        response.status(403)
                            .json({ error: 'You are not allowed to remove this post: only admin and post author can do it.' });
                    }
                })
                .catch(err => response.status(500).send(err)));

    return router;
};

function getFacebookPageAccessToken(request, pageId) {
    const fbPageAccessToken = request.session.fbPageAccessTokens && request.session.fbPageAccessTokens[pageId];

    return fbPageAccessToken ? Promise.resolve(fbPageAccessToken)
        : facebook.getPageAccessToken(request.user.longLiveAccessToken, pageId)
            .then(newFbPageAccessToken => {
                /* eslint-disable no-param-reassign, no-return-assign */
                request.session.fbPageAccessTokens = request.session.fbPageAccessTokens || {};
                return request.session.fbPageAccessTokens[pageId] = newFbPageAccessToken;
                /* eslint-enable no-param-reassign, no-return-assign */
            });
}
