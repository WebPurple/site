var expect = require('chai').expect;

var newPostReducer = require('./../../../components/reducers/new-post.reducer').default;
var OPEN_DIALOG = require('./../../../components/actions/post-edit-form.actions').OPEN_DIALOG;
var CLOSE_DIALOG = require('./../../../components/actions/post-edit-form.actions').CLOSE_DIALOG;

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