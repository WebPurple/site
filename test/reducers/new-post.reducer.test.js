import {expect} from 'chai';

import newPostReducer from './../../src/reducers/new-post.reducer';
import {OPEN_DIALOG, CLOSE_DIALOG} from './../../src/actions/post-edit-form.actions';

describe('new-post.reducer', function () {
    var state = {state: {dialogOpen: true}};
    var openDialogAction = {type: OPEN_DIALOG};
    var closeDialogAction = {type: CLOSE_DIALOG};

    it('should toggle dialog correctly', function () {
        let newState = newPostReducer(state, openDialogAction);
        expect(newState.state.dialogOpen).to.be.true;

        newState = newPostReducer(state, closeDialogAction);
        expect(newState.state.dialogOpen).to.be.false;
    });
});