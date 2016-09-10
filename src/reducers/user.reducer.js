import {
    RECEIVE_USER,
    CHANGE_USER_NAME,
    SAVE_USER,
    REQUEST_USER,
    RECEIVE_ROLES,
} from '../actions/user.actions';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_USER_NAME:
            return {
                ...state,
                account: { ...state.account, displayName: action.payload },
            };
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
