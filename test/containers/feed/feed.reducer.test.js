import { fromJS, List } from 'immutable';

import feedReducer from './../../../src/containers/feed/feed.reducer';
import { REQUEST_POSTS, receivePosts, postRemoved, postAdded } from './../../../src/containers/feed/feed.actions';

describe('feed.reducer', () => {
    const state = fromJS({ posts: [] });

    it('should create empty object on init', () => expect(feedReducer(undefined, {})).toBeDefined());

    it('should return old state on unknown action', () => expect(feedReducer(state, {})).toEqual(state));

    describe('request_posts action', () => {
        const action = { type: REQUEST_POSTS };
        const newState = feedReducer(state, action);

        it('should assign true to isFetching', () => {
            expect(newState.get('isFetching')).toBe(true);
        });
    });

    describe('receive_posts action', () => {
        const posts = [{ id: 1, title: 'post 1' }];
        let newState = feedReducer(state, receivePosts(posts, undefined, 0));

        it('should rewrite all received items if from === 0', () => {
            expect(newState.get('posts')).toEqual(new List(posts));
        });

        it('should concat received items to existing posts if position !== 0', () => {
            newState = feedReducer(newState, receivePosts(posts));
            expect(newState.get('posts')).toEqual(new List(posts.concat(posts)));
        });

        it('should set allPostsLoaded to true when received count of items less then requested', () => {
            newState = feedReducer(state, receivePosts(posts, undefined, 0, 1));
            expect(newState.get('allPostsLoaded')).toBe(false);
            newState = feedReducer(state, receivePosts(posts, undefined, 0, 2));
            expect(newState.get('allPostsLoaded')).toBe(true);
        });

        it('should assign true to isFetching', () => {
            expect(newState.get('isFetching')).toBe(false);
        });
    });

    describe('post_added action', () => {
        const post = { id: 1, title: 'post 1' };
        const newState = feedReducer(state, postAdded(post));

        it('should add new post to the beginning of array',
            () => expect(newState.get('posts').get(0)).toEqual(post));


        it('should not save post if error returned',
            () => expect(feedReducer(newState, postAdded('some error', true))).toEqual(newState));
    });

    describe('post_removed action', () => {
        const removedPost = { _id: 1, title: 'post 1' };
        const newState = feedReducer(
            fromJS({ posts: [] })
                // not to convert post objects to maps
                .update('posts', posts => posts.concat([removedPost, { title: 'Remaining post' }])),
            postRemoved(removedPost)
        );

        it('should remove deleted post from array', () => {
            expect(newState.get('posts').size).toBe(1);
            expect(newState.get('posts').get(0)).not.toEqual(removedPost);
        });
    });
});
