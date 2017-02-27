import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import * as actions from '../../../src/containers/feed/feed.actions';
import * as actionTypes from '../../../src/containers/feed/feed.action-types';

const mockStore = configureMockStore([thunk]);

describe('feed.actions', () => {
    describe('POST_ADDED action', () => {
        const newPost = 'new post';
        it('should return post as payload when error parameter is falsy', () => expect(actions.postAdded(newPost))
            .toEqual({
                type: actionTypes.POST_ADDED,
                payload: newPost,
                error: undefined,
            }));

        const error = 'error';
        it('should return error as payload, and error === true in case of error', () => expect(actions.postAdded(error, true))
            .toEqual({
                type: actionTypes.POST_ADDED,
                payload: error,
                error: true,
            }));
    });

    it('should create an action to remove post', () => {
        const post = 'removed post';
        expect(actions.postRemoved(post))
            .toEqual({
                type: actions.POST_REMOVED,
                payload: post,
            });
    });

    it('should create an action to request posts', () => {
        expect(actions.requestPosts())
            .toEqual({
                type: actions.REQUEST_POSTS,
            });
    });

    it('should create an action to receive posts', () => {
        const posts = [{ _id: 1 }];
        const type = 'cha';
        const from = 0;
        const limit = 1;
        expect(actions.receivePosts(posts, type, from, limit))
            .toEqual({
                type: actions.RECEIVE_POSTS,
                payload: { posts, type, from, limit },
            });
    });

    describe('async', () => {
        afterEach(fetchMock.restore);

        it('should create an action to fetch posts', () => {
            const posts = [{ _id: 1 }];
            const type = 'cha';
            const from = 0;
            const limit = 1;
            const store = mockStore();

            fetchMock.get('/api/posts?type=cha&from=0&limit=1', posts);

            return store.dispatch(actions.fetchPosts(type, from, limit))
                .then(() => {
                    expect(fetchMock.called('/api/posts?type=cha&from=0&limit=1')).toBe(true);
                    expect(store.getActions()).toEqual([
                        actions.requestPosts(),
                        actions.receivePosts(posts, type, from, limit),
                    ]);
                });
        });

        it('should create an action to delete posts', () => {
            const post = { _id: 1 };
            const store = mockStore();

            fetchMock.delete('/api/posts/1', post);

            return store.dispatch(actions.deletePost(1))
                .then(() => {
                    expect(fetchMock.called('/api/posts/1')).toBe(true);
                    expect(store.getActions()).toEqual([
                        { type: actions.POST_REMOVED, payload: post },
                    ]);
                });
        });
    });
});
