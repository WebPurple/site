import { expect } from 'chai';

import * as actionTypes from './../../../../src/containers/feed/new-post/new-post.action-types';
import * as actions from './../../../../src/containers/feed/new-post/new-post.actions';

describe('new-post.actions', () => {
    it('should create an action to open dialog',
        () => expect(actions.openDialog())
            .to.deep.equal({ type: actionTypes.OPEN_DIALOG }));

    it('should create an action to close dialog',
        () => expect(actions.closeDialog())
            .to.deep.equal({ type: actionTypes.CLOSE_DIALOG }));
});
