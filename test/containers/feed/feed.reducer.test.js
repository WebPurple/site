import { expect } from 'chai';

import feedReducer from './../../../src/containers/feed/feed.reducer';
import { REQUEST_POSTS, RECEIVE_POSTS } from './../../../src/containers/feed/feed.actions';
import { POST_ADDED } from './../../../src/containers/feed/post-edit-form/post-edit-form.actions';

describe('feed.reducer', () => {
    const state = Object.freeze({});

    it('should create empty object on init', () => expect(feedReducer(undefined, {})).to.be.defined);

    it('should return old state on unknown action', () => expect(feedReducer(state, {})).to.equal(state));

    describe('request_posts action', () => {
        const action = { type: REQUEST_POSTS };
        const newState = feedReducer(state, action);

        it('should assign true to isFetching', () => {
            expect(newState.isFetching).to.be.true;
        });
    });

    describe('receive_posts action', () => {
        const posts = [{ id: 1, title: 'post 1' }];
        const action = { type: RECEIVE_POSTS, payload: posts };
        const newState = feedReducer(state, action);

        it('should save all received items', () => {
            expect(newState.posts).to.be.equal(posts);
        });

        it('should assign true to isFetching', () => {
            expect(newState.isFetching).to.be.false;
        });
    });

    describe('post_added action', () => {
        const post = { id: 1, title: 'post 1' };
        const action = { type: POST_ADDED, payload: post };
        const newState = feedReducer(state, action);

        it('should add new post to the beginning of array', () => {
            expect(newState.posts[0]).to.be.equal(post);
        });
    });
});
