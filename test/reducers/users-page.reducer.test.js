import { expect } from 'chai';

import usersPageReducer from './../../src/reducers/users-page.reducer';
import { receiveAllUsers } from './../../src/actions/user.actions';

describe('users-page.reducer', () => {
    const state = Object.freeze({});

    it('should create empty object on init', () => expect(usersPageReducer(undefined, {})).to.be.defined);

    it('should return old state on unknown action', () => expect(usersPageReducer(state, {})).to.equal(state));

    describe('RECEIVE_ALL_USERS action', () => {
        const users = 'users';

        it('should save received users', () => {
            expect(usersPageReducer(state, receiveAllUsers(users)).users).to.equal(users);
        });
    });
});
