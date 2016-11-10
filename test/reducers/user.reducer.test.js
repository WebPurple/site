import { expect } from 'chai';

import userReducer from './../../src/reducers/user.reducer';
import {
    requestUser,
    receiveUser,
    receiveRoles,
    SAVE_USER,
} from './../../src/actions/user.actions';

describe('user.reducer', () => {
    const state = { account: {}, allRoles: [] };
    Object.freeze(state);

    it('should create empty object on init', () => {
        expect(userReducer(undefined, {})).to.be.defined;
    });

    it('should return same state by default', () => {
        expect(userReducer(state, {})).to.equal(state);
    });

    it('should set isFetching to true on REQUEST_USER or SAVE_USER', () => {
        expect(userReducer(state, { type: SAVE_USER }).isFetching).to.be.true;
        expect(userReducer(state, requestUser()).isFetching).to.be.true;
    });

    it('should set isFetching to false on RECEIVE_USER', () => {
        expect(userReducer(state, receiveUser({})).isFetching).to.be.false;
    });

    it('should save received user', () => {
        const user = 'user1';
        expect(userReducer(state, receiveUser(user)).account).to.equal(user);
    });

    it('should save received roles', () => {
        const roles = ['admin', 'editor'];
        expect(userReducer(state, receiveRoles(roles)).allRoles).to.eql(roles);
    });
});
