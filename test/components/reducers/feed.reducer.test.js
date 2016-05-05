var expect = require('chai').expect;

var feedReducer = require('./../../../components/reducers/feed.reducer.ts').default;
var REQUEST_POSTS = require('./../../../components/actions/feed.actions.ts').REQUEST_POSTS;
var RECEIVE_POSTS = require('./../../../components/actions/feed.actions.ts').RECEIVE_POSTS;
var POST_ADDED = require('./../../../components/actions/post-edit-form.actions.ts').POST_ADDED;

describe('feed.reducer', function () {

    describe('request_posts action', function () {

        var action = {type: REQUEST_POSTS};
        var newState = feedReducer({}, action);

        it('should assign true to isFetching', function () {
            expect(newState.isFetching).to.be.true;
        });
    });

    describe('receive_posts action', function () {

        var posts = [{id: 1, title: 'post 1'}];
        var action = {type: RECEIVE_POSTS, payload: posts};
        var newState = feedReducer({}, action);

        it('should save all received items', function () {
            expect(newState.posts).to.be.equal(posts);
        });

        it('should assign true to isFetching', function () {
            expect(newState.isFetching).to.be.false;
        });
    });

    describe('post_added action', function () {

        var post = {id: 1, title: 'post 1'};
        var action = {type: POST_ADDED, payload: post};
        var newState = feedReducer({}, action);

        it('should add new post to the beginning of array', function () {
            expect(newState.posts[0]).to.be.equal(post);
        });
    });
});