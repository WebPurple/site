import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import newPostReducer from '../../../../src/containers/feed/new-post/new-post.reducer';
import {
    openDialog,
    closeDialog,
    closeErrorDialog,
    editPost,
} from '../../../../src/containers/feed/new-post/new-post.actions';
import { postAdded } from '../../../../src/containers/feed/feed.actions';

describe('new-post.reducer', () => {
    const state = deepFreeze({ state: { dialogOpen: true } });

    it('should toggle dialog correctly', () => {
        let newState = newPostReducer(state, openDialog());
        expect(newState.state.dialogOpen).to.be.true;

        newState = newPostReducer(state, closeDialog());
        expect(newState.state.dialogOpen).to.be.false;
    });

    it('should close dialog when post is saved',
        () => expect(newPostReducer(state, postAdded()).state.dialogOpen).to.be.false);

    it('should show error when post addition failed', () => {
        const error = 'error';
        expect(newPostReducer(state, postAdded(error, true)).state.error).to.equal(error);
    });

    it('should close error',
        () => expect(newPostReducer(state, closeErrorDialog()).state.error).to.not.exist);

    it('should open dialog on post edit',
        () => expect(newPostReducer(state, editPost()).state.dialogOpen).to.be.true);
});
