const userService = require('./../../../src/server/services/user.service');

describe('Server User service', () => {
    it('should exists', () => expect(userService).toBeDefined());

    describe('createUser method', () => {
        it('should exist', () => expect(userService.createUser).toBeDefined());
    });
    describe('checkUser method', () => {
        it('should exist', () => expect(userService.checkUser).toBeDefined());
    });
    describe('getUser method', () => {
        it('should exist', () => expect(userService.getUser).toBeDefined());
    });
    describe('getUsers method', () => {
        it('should exist', () => expect(userService.getUsers).toBeDefined());
    });
    describe('registerUser method', () => {
        it('should exist', () => expect(userService.registerUser).toBeDefined());
    });
    describe('updateUser method', () => {
        it('should exist', () => expect(userService.updateUser).toBeDefined());
    });
});
