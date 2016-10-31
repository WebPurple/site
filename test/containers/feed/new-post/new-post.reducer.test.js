import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import newPostReducer from '../../../../src/containers/feed/new-post/new-post.reducer';
import { openDialog, closeDialog } from '../../../../src/containers/feed/new-post/new-post.actions';
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
});
