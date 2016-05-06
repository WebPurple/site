import {expect} from 'chai';

import feedReducer from './../../src/reducers/feed.reducer';
import {REQUEST_POSTS, RECEIVE_POSTS} from './../../src/actions/feed.actions';
import {POST_ADDED} from './../../src/actions/post-edit-form.actions';

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