import { expect } from 'chai';

import vkStrategy from './../../../../src/server/controllers/auth/vk.strategy.conf';

describe('vk.strategy.conf', () => {
    it('should exists', () => expect(vkStrategy).to.be.defined);
});
