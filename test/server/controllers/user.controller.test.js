import { expect } from 'chai';

import userController from './../../../src/server/controllers/user.controller';

describe('user.controller', () => {
    it('should exists', () => expect(userController).to.be.defined);
});
