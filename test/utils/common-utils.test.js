import sinon from 'sinon';

import commonUtils from './../../src/utils/common-utils';

describe('common-utils', () => {
    describe('#isString', () => {
        it('should return true if string was passed',
            () => expect(commonUtils.isString('this is string')).toBe(true));

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
            ].forEach(notString => expect(commonUtils.isString(notString)).toBe(false));
        });
    });

    describe('#isFunction', () => {
        it('should return true if function was passed',
            () => expect(commonUtils.isFunction(commonUtils.isFunction)).toBe(true));

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
            ].forEach(notString => expect(commonUtils.isFunction(notString)).toBe(false));
        });
    });

    describe('#hasRoles', () => {
        it('should return true if user has passed role',
            () => expect(commonUtils.hasRoles({ roles: ['boss'] }, 'boss')).toBe(true));

        it('should return false otherwise', () => {
            expect(commonUtils.hasRoles({ roles: ['not a boss'] }, 'boss')).toBe(false);
            expect(commonUtils.hasRoles({ roles: [] }, 'boss')).toBe(false);
        });

        it('should support multiple roles', () => {
            expect(commonUtils.hasRoles({ roles: ['boss', 'employee', 'president'] }, 'boss', 'president')).toBe(true);
            expect(commonUtils.hasRoles({ roles: ['boss', 'employee'] }, 'boss', 'president')).toBe(false);
        });
    });

    describe('#isAdmin', () => {
        it('should return true is user is admin',
            () => expect(commonUtils.isAdmin({ roles: ['admin'] })).toBe(true));

        it('should return false otherwise', () => {
            expect(commonUtils.isAdmin({ roles: ['not an admin'] })).toBe(false);
            expect(commonUtils.isAdmin({ roles: [] })).toBe(false);
        });
    });

    describe('#isEditor', () => {
        it('should return true is user is editor',
            () => expect(commonUtils.isEditor({ roles: ['editor'] })).toBe(true));

        it('should return false otherwise', () => {
            expect(commonUtils.isEditor({ roles: ['not an editor'] })).toBe(false);
            expect(commonUtils.isEditor({ roles: [] })).toBe(false);
        });
    });

    describe('#isAuthorOf', () => {
        it('should return true if user is editor and he has the same id as article author', () => {
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: 1 } })).toBe(true);

            // author might be not populated in post object
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: 1 })).toBe(true);

            // if author id is ObjectId - equals method should be used
            const equals = sinon.stub().returns(true);
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: { equals } } })).toBe(true);
            expect(equals.calledWith(1)).toBe(true);
        });

        it('should return true if post is suggested  and user has the same id as article author', () => {
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 1 }, type: 'suggest' })).toBe(true);

            // author might be not populated in post object
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 1, type: 'suggest' })).toBe(true);

            // if author id is ObjectId - equals method should be used
            const equals = sinon.stub().returns(true);
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: { equals } }, type: 'suggest' })).toBe(true);
            expect(equals.calledWith(1)).toBe(true);
        });

        it('should return false in all other cases', () => {
            // wrong id
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 2 }, type: 'suggest' })).toBe(false);
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 2, type: 'suggest' })).toBe(false);
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: { _id: 2 } })).toBe(false);
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['editor'] }, { author: 2 })).toBe(false);

            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['not an editor'] }, { author: { _id: 1 } })).toBe(false);
            expect(commonUtils.isAuthorOf({ _id: 1, roles: ['not an editor'] }, { author: 1 })).toBe(false);

            // is not suggested
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: { _id: 1 } })).toBe(false);
            expect(commonUtils.isAuthorOf({ _id: 1 }, { author: 1 })).toBe(false);
        });
    });
});
