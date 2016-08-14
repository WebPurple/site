import { RECEIVE_ALL_USERS } from '../actions/user.actions';

export default function usersPageReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}
