const passportConf = require('./../../../src/server/conf/passport');

const hashPassword = passportConf.strategies.local.hashPassword;

describe('Passport configuration', () => {

    describe('hash function', () => {
        it('should exist', () => expect(hashPassword).toBeDefined());
        it('should return Promise instance', () => expect(hashPassword('any')).toBeInstanceOf(Promise));
        it(
            'should return Promise of string',
            () => hashPassword('any').then(hash => expect(typeof hash).toEqual('string')),
        );
    });
});
