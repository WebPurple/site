import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import feedReducer from './../../../src/containers/feed/feed.reducer';
import { REQUEST_POSTS, receivePosts, POST_REMOVED, postAdded } from './../../../src/containers/feed/feed.actions';

describe('feed.reducer', () => {
    const state = deepFreeze({ posts: [] });

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
        let newState = feedReducer(state, receivePosts(posts, undefined, 0));

        it('should rewrite all received items if from === 0', () => {
            expect(newState.posts).to.be.equal(posts);
        });

        it('should concat received items to existing posts if position !== 0', () => {
            newState = feedReducer(deepFreeze(newState), receivePosts(posts));
            expect(newState.posts).to.eql(posts.concat(posts));
        });

        it('should set allPostsLoaded to true when received count of items less then requested', () => {
            newState = feedReducer(state, receivePosts(posts, undefined, 0, 1));
            expect(newState.allPostsLoaded).to.equal(false);
            newState = feedReducer(state, receivePosts(posts, undefined, 0, 2));
            expect(newState.allPostsLoaded).to.equal(true);
        });

        it('should assign true to isFetching', () => {
            expect(newState.isFetching).to.be.false;
        });
    });

    describe('post_added action', () => {
        const post = { id: 1, title: 'post 1' };
        const newState = feedReducer(state, postAdded(post));

        it('should add new post to the beginning of array', () => {
            expect(newState.posts[0]).to.be.equal(post);
        });
    });

    describe('post_removed action', () => {
        const removedPost = { _id: 1, title: 'post 1' };
        const action = { type: POST_REMOVED, payload: removedPost };
        const newState = feedReducer(
            deepFreeze({ posts: [removedPost, { title: 'Remaining post' }] }),
            action
        );

        it('should remove deleted post from array', () => {
            expect(newState.posts.length).to.be.equal(1);
            expect(newState.posts[0]).to.be.not.equal(removedPost);
        });
    });
});
