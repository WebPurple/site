var express = require('express');
var mongoose = require('mongoose');

var postSchema = require('./../schemas/post.schema');
var Post = mongoose.model('posts', postSchema);

module.exports = () => {
    var router = express.Router();

    router.route('/posts')
        // add new post
        .post((request, response) => {
            return new Post({
                text: request.body.text,
                date: new Date(),
                author: request.user._id,
                title: request.body.title
            }).save()
                .then(post => response.send(post))
                .catch(err => response.send(err));
        })
        // get all posts
        .get((request, response) => Post.find().exec()
            .then(post => response.send(post))
            .catch(err => response.send(err)));

    router.route('/posts/:post_id')
        // get post by id
        .get((request, response) => Post.findById(request.params.post_id).exec()
            .then(post => response.send(post))
            .catch(err => response.send(err)))
        // update post
        .put((request, response) => {
            Post.findById(request.params.post_id).exec()
                .then(post => {
                    post.text = request.body.text;
                    post.author = request.body.author;
                    post.title = request.body.title;
                    return post.save();
                })
                .then(post => response.send(post))
                .catch(err => response.send(err))
        })
        .delete((request, response) => Post.remove({_id: request.params.post_id})
            .then(post => response.send(post))
            .catch(err => response.send(err)));

    return router;
};