import { expect } from 'chai';

import userReducer from './../../src/reducers/user.reducer';

describe('user.reducer', () => {
    it('should exists', () => expect(userReducer).to.be.defined);
});
