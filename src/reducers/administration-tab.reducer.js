import { RECEIVE_ALL_USERS, ROLE_ADDED, ROLE_REMOVED } from '../actions/user.actions';

export default function usersPageReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return { ...state, users: action.payload };
        case ROLE_ADDED:
        case ROLE_REMOVED:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.payload._id) {
                        return action.payload;
                    }
                    return user;
                }),
            };
        default:
            return state;
    }
}
