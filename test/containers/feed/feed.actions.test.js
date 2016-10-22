import { expect } from 'chai';

import * as actions from '../../../src/containers/feed/feed.actions';

describe('feed.actions', () => {
    it('should create an action to remove post', () => {
        const post = 'removed post';
        expect(actions.postRemoved(post))
            .to.deep.equal({
                type: actions.POST_REMOVED,
                payload: post,
            });
    });
});
