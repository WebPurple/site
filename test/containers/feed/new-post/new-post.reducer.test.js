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
        expect(newState.state.dialogOpen).toBe(true);

        newState = newPostReducer(state, closeDialog());
        expect(newState.state.dialogOpen).toBe(false);
    });

    it('should close dialog when post is saved',
        () => expect(newPostReducer(state, postAdded()).state.dialogOpen).toBe(false));

    it('should show error when post addition failed', () => {
        const error = 'error';
        expect(newPostReducer(state, postAdded(error, true)).state.error).toBe(error);
    });

    it('should close error',
        () => expect(newPostReducer(state, closeErrorDialog()).state.error).toBeUndefined());

    it('should open dialog on post edit',
        () => expect(newPostReducer(state, editPost()).state.dialogOpen).toBe(true));
});
