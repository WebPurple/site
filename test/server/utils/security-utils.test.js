var assert = require('chai').assert;
var sinon = require('sinon');

var securityUtils = require('./../../../server/utils/security-utils');

describe('securityUtils', function () {

    describe('checkPermissions', function () {

        var request, response, next;

        beforeEach(function () {
            request = {};
            response = {status: sinon.spy(), send: sinon.spy()};
            next = sinon.spy();
        });

        it('should return 403 when request is not authenticated', function (done) {

            request.isAuthenticated = sinon.stub().returns(false);

            securityUtils.checkPermissions(request, response, next);

            assert(response.status.calledWith(403));
            assert(response.send.called);

            done();
        });

        it('should call next() when request is authenticated', function (done) {

            request.isAuthenticated = sinon.stub().returns(true);

            securityUtils.checkPermissions(request, response, next);

            assert(next.called);

            done();
        });
    });
});