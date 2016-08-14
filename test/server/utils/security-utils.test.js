import { assert } from 'chai';
import sinon from 'sinon';

import securityUtils from './../../../src/server/utils/security-utils';

describe('securityUtils', () => {
    describe('checkPermissions', () => {
        let request;
        let response;
        let next;

        beforeEach(() => {
            request = {};
            response = { status: sinon.spy(), send: sinon.spy() };
            next = sinon.spy();
        });

        it('should return 403 when request is not authenticated', (done) => {
            request.isAuthenticated = sinon.stub().returns(false);

            securityUtils.checkPermissions(request, response, next);

            assert(response.status.calledWith(403));
            assert(response.send.called);

            done();
        });

        it('should call next() when request is authenticated', (done) => {
            request.isAuthenticated = sinon.stub().returns(true);

            securityUtils.checkPermissions(request, response, next);

            assert(next.called);

            done();
        });
    });
});
