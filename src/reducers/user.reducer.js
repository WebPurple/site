import {
    RECEIVE_USER,
    SAVE_USER,
    REQUEST_USER,
    RECEIVE_ROLES,
} from '../actions/user.actions';

const userReducer = (state = { isAuthorized: false }, action) => {
    const { payload } = action;

    switch (action.type) {
        case SAVE_USER:
        case REQUEST_USER:
            return { ...state, isFetching: true };
        case RECEIVE_USER:
            return { ...state, account: payload, isFetching: false, isAuthorized: Boolean(payload._id) };
        case RECEIVE_ROLES:
            return { ...state, allRoles: payload };
        default:
            return state;
    }
};

export default userReducer;
