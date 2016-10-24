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

    it('should create and action to request posts', () => {
        expect(actions.requestPosts())
            .to.deep.equal({
                type: actions.REQUEST_POSTS,
            });
    });

    it('should create and action to receive posts', () => {
        const posts = [{ _id: 1 }];
        expect(actions.receivePosts(posts))
            .to.deep.equal({
                type: actions.RECEIVE_POSTS,
                payload: posts,
            });
    });
});
