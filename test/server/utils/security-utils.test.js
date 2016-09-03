import { expect } from 'chai';
import sinon from 'sinon';

import securityUtils from './../../../src/server/utils/security-utils';

describe('securityUtils', () => {
    describe('checkPermissions', () => {
        let request;
        let response;
        let next;

        beforeEach(() => {
            request = { isAuthenticated: sinon.spy() };
            response = { status: sinon.spy(), send: sinon.spy() };
            next = sinon.spy();
        });

        it('should return 403 when at least one passed predicate had returned false', () => {
            const checkPermissions = securityUtils.checkPermissions(() => true, () => false);

            checkPermissions(request, response, next);

            expect(response.status.calledWith(403)).to.be.true;
            expect(response.send.called).to.be.true;
        });

        it('should call next() when all passed predicate[s] returned true', () => {
            const checkPermissions = securityUtils.checkPermissions(() => true);

            checkPermissions(request, response, next);

            expect(response.status.calledWith(403)).to.be.true;
            expect(response.send.called).to.be.true;
        });

        it('should check if request is authenticated by default', () => {
            const checkPermissions = securityUtils.checkPermissions();

            request.isAuthenticated = sinon.stub().returns(false);
            checkPermissions(request, response, next);

            expect(response.status.calledWith(403)).to.be.true;
            expect(response.send.called).to.be.true;
            expect(next.called).to.be.false;

            request.isAuthenticated = sinon.stub().returns(true);
            checkPermissions(request, response, next);

            expect(next.called).to.be.true;
        });
    });
});
