const passportConf = require('./../../../src/server/conf/passport');

const { hashPassword, checkPassword } = passportConf.strategies.local;

describe('Passport configuration', () => {
    const password = 'any password';

    describe('hash function', () => {
        it('should exist', () => expect(hashPassword).toBeDefined());
        it('should return string', () => expect(typeof hashPassword(password)).toEqual('string'));
    });

    describe('checkPassword function', () => {
        const passwordHash = hashPassword(password);

        it('should exist', () => expect(checkPassword).toBeDefined());
        it('should return boolean', () => {
            expect(typeof checkPassword(password, passwordHash)).toEqual('boolean');
        });
        it('should check generated password', () => {
            expect(checkPassword(password, passwordHash)).toBeTruthy();
        });
    });
});
