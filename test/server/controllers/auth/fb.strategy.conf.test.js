import { expect } from 'chai';

import fbStrategy from './../../../../src/server/controllers/auth/fb.strategy.conf';

describe('fb.strategy.conf', () => {
    it('should exists', () => expect(fbStrategy).to.be.defined);
});
