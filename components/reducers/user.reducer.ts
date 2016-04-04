import {IAction} from '../actions/actions';
import {IUser} from '../vo/index';
import {RECEIVE_USER} from '../actions/user.actions';

const userReducer = (state = null, action: IAction<IUser>) => {
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;