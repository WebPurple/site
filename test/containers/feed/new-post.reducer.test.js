import { expect } from 'chai';

import newPostReducer from './../../../src/containers/feed/new-post/new-post.reducer';
import { OPEN_DIALOG, CLOSE_DIALOG } from './../../../src/containers/feed/post-edit-form/post-edit-form.actions';

describe('new-post.reducer', () => {
    const state = { state: { dialogOpen: true } };
    const openDialogAction = { type: OPEN_DIALOG };
    const closeDialogAction = { type: CLOSE_DIALOG };

    it('should toggle dialog correctly', () => {
        let newState = newPostReducer(state, openDialogAction);
        expect(newState.state.dialogOpen).to.be.true;

        newState = newPostReducer(state, closeDialogAction);
        expect(newState.state.dialogOpen).to.be.false;
    });
});
