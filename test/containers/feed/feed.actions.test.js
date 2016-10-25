import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import * as actions from '../../../src/containers/feed/feed.actions';

const mockStore = configureMockStore([thunk]);

describe('feed.actions', () => {
    it('should create an action to remove post', () => {
        const post = 'removed post';
        expect(actions.postRemoved(post))
            .to.deep.equal({
                type: actions.POST_REMOVED,
                payload: post,
            });
    });

    it('should create an action to request posts', () => {
        expect(actions.requestPosts())
            .to.deep.equal({
                type: actions.REQUEST_POSTS,
            });
    });

    it('should create an action to receive posts', () => {
        const posts = [{ _id: 1 }];
        expect(actions.receivePosts(posts))
            .to.deep.equal({
                type: actions.RECEIVE_POSTS,
                payload: posts,
            });
    });

    describe('async', () => {
        it('should create an action to fetch posts', () => {
            const posts = [{ _id: 1 }];
            const store = mockStore();

            fetchMock.get('/api/posts', posts);

            store.dispatch(actions.fetchPosts())
                .then(() => {
                    expect(fetchMock.called('/api/posts')).to.be.true;
                    expect(store.getActions()).to.deep.equal([
                        { type: actions.REQUEST_POSTS },
                        { type: actions.RECEIVE_POSTS, payload: posts },
                    ]);
                });
        });

        it('should create an action to delete posts', () => {
            const post = { _id: 1 };
            const store = mockStore();

            fetchMock.delete('/api/posts/1', post);

            store.dispatch(actions.deletePost(1))
                .then(() => {
                    expect(fetchMock.called('/api/posts/1')).to.be.true;
                    expect(store.getActions()).to.deep.equal([
                        { type: actions.POST_REMOVED, payload: post },
                    ]);
                });
        });
    });
});
