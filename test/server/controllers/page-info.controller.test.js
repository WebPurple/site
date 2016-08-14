import { expect } from 'chai';

import pageInfoController from './../../../src/server/controllers/page-info.controller';

describe('page-info.controller', () => {
    it('should exists', () => expect(pageInfoController).to.be.defined);
});
