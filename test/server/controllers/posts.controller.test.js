import { expect } from 'chai';

import postsController from './../../../src/server/controllers/posts.controller';

describe('posts.controller', () => {
    it('should exists', () => expect(postsController).to.be.defined);
});
