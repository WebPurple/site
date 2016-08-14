import {
    RECEIVE_USER,
    CHANGE_USER_NAME,
    SAVE_USER,
    REQUEST_USER,
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
            return Object.assign({}, state, { isFetching: true });
        case RECEIVE_USER:
            return { account: action.payload, isFetching: false };
        default:
            return state;
    }
};

export default userReducer;
