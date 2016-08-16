import { expect } from 'chai';

import rssController from './../../../src/server/controllers/rss.controller';

describe('rss.controller', () => {
    it('should exists', () => expect(rssController).to.be.defined);
});
