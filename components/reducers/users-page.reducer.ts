import {IAction} from '../actions/actions';
import {RECEIVE_ALL_USERS} from '../actions/user.actions';

export default function usersPageReducer(state = {}, action: IAction<any>) {
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return Object.assign({}, state, {users: action.payload});
        default:
            return state;
    }
}