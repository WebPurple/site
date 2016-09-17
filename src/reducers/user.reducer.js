import {
    RECEIVE_USER,
    SAVE_USER,
    REQUEST_USER,
    RECEIVE_ROLES,
} from '../actions/user.actions';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_USER:
        case REQUEST_USER:
            return { ...state, isFetching: true };
        case RECEIVE_USER:
            return { ...state, account: action.payload, isFetching: false };
        case RECEIVE_ROLES:
            return { ...state, allRoles: action.payload };
        default:
            return state;
    }
};

export default userReducer;
