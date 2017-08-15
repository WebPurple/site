const validators = require('./../../src/utils/validators').default;

describe('React Form validator', () => {
    const length = 5;

    describe('email', () => {
        it('should exist', () => expect(validators.email).toBeDefined());
        it('should return string on failure', () => expect(typeof validators.email('a')).toEqual('string'));
        it('should return undefined on success', () => expect(validators.email('test@test.com')).toBeUndefined());
        it('should succeed on empty value', () => expect(validators.email('')).toBeUndefined());
    });

    describe('maxLength', () => {
        it('should exist', () => expect(validators.maxLength).toBeDefined());
        it('should return validation function', () => expect(validators.maxLength(length)).toBeInstanceOf(Function));
        it('should return string on failure', () => expect(typeof validators.maxLength(length)('qwerty')).toEqual('string'));
        it('should return undefined on success', () => expect(validators.maxLength(length)('qwert')).toBeUndefined());
        it('should succeed on empty value', () => expect(validators.maxLength(length)('')).toBeUndefined());
    });

    describe('minLength', () => {
        it('should exist', () => expect(validators.minLength).toBeDefined());
        it('should return validation function', () => expect(validators.minLength(length)).toBeInstanceOf(Function));
        it('should return string on failure', () => expect(typeof validators.minLength(length)('qwer')).toEqual('string'));
        it('should return undefined on success', () => expect(validators.minLength(length)('qwerty')).toBeUndefined());
        it('should succeed on empty value', () => expect(validators.minLength(length)('')).toBeUndefined());
    });

    describe('required', () => {
        it('should exist', () => expect(validators.required).toBeDefined());
        it('should return string on failure', () => expect(typeof validators.required('')).toEqual('string'));
        it('should return undefined on success', () => expect(validators.required('qwert')).toBeUndefined());
    });
});
