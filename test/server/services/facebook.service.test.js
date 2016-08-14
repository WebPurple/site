import { expect } from 'chai';

import facebookService from './../../../src/server/services/facebook.service';

describe('facebook.service', () => {
    it('should exists', () => expect(facebookService).to.be.defined);
});
