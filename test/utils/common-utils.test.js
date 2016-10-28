import { expect } from 'chai';
import sinon from 'sinon';

import commonUtils from './../../src/utils/common-utils';

describe('common-utils', () => {
    describe('#isString', () => {
        it('should return true if string was passed',
            () => expect(commonUtils.isString('this is string')).to.be.true);

        it('should return false in all other cases', () => {
            [
                {},
                [],
                1,
                true,
                null,
                undefined,
                /this is RegExp/,
                commonUtils.isString,
            ].forEach(notString => expect(commonUtils.isString(notString)).to.be.false);
        });
    });

    describe('#isFunction', () => {
        it('should return true if function was passed',
            () => expect(commonUtils.isFunction(commonUtils.isFunction)).to.be.true);

        it('should return false in all other cases', () => {
            [
                {},
                [],
                1,
                true,
                null,
                undefined,
                /this is RegExp/,
                'this is string',
            ].forEach(notString => expect(commonUtils.isFunction(notString)).to.be.false);
        });
    });

    describe('#hasRoles', () => {
        it('should return true if user has passed role',
            () => expect(commonUtils.hasRoles({ roles: ['boss'] }, 'boss')).to.be.true);

        it('should return false otherwise', () => {
            expect(commonUtils.hasRoles({ roles: ['not a boss'] }, 'boss')).to.be.false;
            expect(commonUtils.hasRoles({ roles: [] }, 'boss')).to.be.false;
        });

        it('should support multiple roles', () => {
            expect(commonUtils.hasRoles({ roles: ['boss', 'employee', 'president'] }, 'boss', 'president')).to.be.true;
            expect(commonUtils.hasRoles({ roles: ['boss', 'employee'] }, 'boss', 'president')).to.be.false;
        });
    });

    describe('#isAdmin', () => {
        it('should return true is user is admin',
            () => expect(commonUtils.isAdmin({ roles: ['admin'] })).to.be.true);

        it('should return false otherwise', () => {
            expect(commonUtils.isAdmin({ roles: ['not an admin'] })).to.be.false;
            expect(commonUtils.isAdmin({ roles: [] })).to.be.false;
        });
    });

    describe('#isEditor', () => {
        it('should return true is user is editor',
            () => expect(commonUtils.isEditor({ roles: ['editor'] })).to.be.true);

        it('should return false otherwise', () => {
            expect(commonUtils.isEditor({ roles: ['not an editor'] })).to.be.false;
            expect(commonUtils.isEditor({ roles: [] })).to.be.false;
        });
    });

    describe('#isAuthorOf', () => {
        it('should return true if user is editor and he has the same id as article author', () => {
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: 1 } })).to.be.true;

            // author might be not populated in post object
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: 1 })).to.be.true;

            // if author id is ObjectId - equals method should be used
            const equals = sinon.stub().returns(true);
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: { equals } } })).to.be.true;
            expect(equals.calledWith(1)).to.be.true;
        });

        it('should return true if post is suggested  and user has the same id as article author', () => {
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 1 }, type: 'suggest' })).to.be.true;

            // author might be not populated in post object
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 1, type: 'suggest' })).to.be.true;

            // if author id is ObjectId - equals method should be used
            const equals = sinon.stub().returns(true);
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: { equals } }, type: 'suggest' })).to.be.true;
            expect(equals.calledWith(1)).to.be.true;
        });

        it('should return false in all other cases', () => {
            // wrong id
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 2 }, type: 'suggest' })).to.be.false;
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 2, type: 'suggest' })).to.be.false;
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: 2 } })).to.be.false;
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: 2 })).to.be.false;

            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['not an editor'] }, { author: { _id: 1 } })).to.be.false;
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['not an editor'] }, { author: 1 })).to.be.false;

            // is not suggested
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 1 } })).to.be.false;
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 1 })).to.be.false;
        });
    });
});
