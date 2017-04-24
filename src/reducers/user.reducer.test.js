import userReducer, {
    requestUser,
    receiveUser,
    receiveRoles,
    SAVE_USER,
} from './user.reducer';

describe('user.reducer', () => {
    const state = { account: {}, allRoles: [] };
    Object.freeze(state);

    it('should create empty object on init', () => {
        expect(userReducer(undefined, {})).toBeDefined();
    });

    it('should return same state by default', () => {
        expect(userReducer(state, {})).toEqual(state);
    });

    it('should set isFetching to true on REQUEST_USER or SAVE_USER', () => {
        expect(userReducer(state, { type: SAVE_USER }).isFetching).toBe(true);
        expect(userReducer(state, requestUser()).isFetching).toBe(true);
    });

    it('should set isFetching to false on RECEIVE_USER', () => {
        expect(userReducer(state, receiveUser({})).isFetching).toBe(false);
    });

    it('should save received user', () => {
        const user = 'user1';
        expect(userReducer(state, receiveUser(user)).account).toBe(user);
    });

    it('should save received roles', () => {
        const roles = ['admin', 'editor'];
        expect(userReducer(state, receiveRoles(roles)).allRoles).toEqual(roles);
    });
});
