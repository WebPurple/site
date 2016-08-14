import { expect } from 'chai';

import * as ajax from './../../src/utils/ajax';

describe('ajax', () => {
    it('should exists', () => expect(ajax).to.be.defined);
});
