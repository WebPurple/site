import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import * as actionTypes from './../../../../src/containers/feed/new-post/new-post.action-types';
import * as actions from './../../../../src/containers/feed/new-post/new-post.actions';
import * as feedActions from './../../../../src/containers/feed/feed.actions';

describe('new-post.actions', () => {
    it('should create an action to open dialog',
        () => expect(actions.openDialog())
            .to.deep.equal({ type: actionTypes.OPEN_DIALOG }));

    it('should create an action to close dialog',
        () => expect(actions.closeDialog())
            .to.deep.equal({ type: actionTypes.CLOSE_DIALOG }));

    it('should create an action to close error dialog',
        () => expect(actions.closeErrorDialog())
            .to.deep.equal({ type: actionTypes.CLOSE_ERROR_DIALOG }));

    it('should create an action to edit post', () => {
        const postToEdit = 'post';
        expect(actions.editPost(postToEdit))
            .to.deep.equal({ type: actionTypes.EDIT_POST, payload: postToEdit });
    });

    it('should create an action to notify that post form was submitted',
        () => expect(actions.formSubmitted())
            .to.deep.equal({ type: actionTypes.SUBMIT_POST_FORM }));

    describe('async', () => {
        const mockStore = configureMockStore([thunk]);

        afterEach(fetchMock.restore);

        describe('#submitPostForm', () => {
            let store;

            beforeEach(() => (store = mockStore()));

            it('should notify about form submission and use POST /posts if post doesn\'t have _id', () => {
                const postToAdd = { title: 'title', description: 'descr' };
                const addedPost = Object.assign({}, postToAdd, { _id: 1 });

                fetchMock.post('/api/posts/', addedPost);

                return store.dispatch(actions.submitPostForm(postToAdd))
                    .then(() => {
                        expect(fetchMock.called('/api/posts/')).to.be.true;
                        expect(store.getActions()).to.eql([
                            actions.formSubmitted(),
                            feedActions.postAdded(addedPost),
                        ]);
                    });
            });

            it('should notify about form submission and use PUT /post/:id if post has _id', () => {
                const postToUpdate = { _id: 1, title: 'title', description: 'descr' };

                fetchMock.put('/api/posts/1', postToUpdate);

                return store.dispatch(actions.submitPostForm(postToUpdate))
                    .then(() => {
                        expect(fetchMock.called('/api/posts/1')).to.be.true;
                        expect(store.getActions()).to.eql([
                            actions.formSubmitted(),
                            feedActions.postAdded(postToUpdate),
                        ]);
                    });
            });

            it('should notify about form submission and dispatch error if creation/updating failed', () => {
                const postToUpdate = { _id: 1, title: 'title', description: 'descr' };

                fetchMock.put('/api/posts/1', 500, postToUpdate);

                return store.dispatch(actions.submitPostForm(postToUpdate))
                    .then(() => {
                        expect(fetchMock.called('/api/posts/1')).to.be.true;
                        expect(store.getActions()).to.eql([
                            actions.formSubmitted(),
                            feedActions.postAdded('Internal Server Error', true),
                        ]);
                    });
            });
        });
    });
});
