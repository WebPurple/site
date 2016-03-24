import {getJson} from "../utils/ajax";
import {IAction} from "./actions";
import {IUser} from "../vo/index";

export const REQUEST_USER = 'request_user';

export function requestUser(): IAction<void> {
    return {
        type: REQUEST_USER
    };
}

export const RECEIVE_USER = 'receive_user';

export function receiveUser(user): IAction<IUser> {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export function fetchUser() {
    return (dispatch: Redux.Dispatch) => {
        dispatch(requestUser());
        return getJson('/api/user')
            .then(user => dispatch(receiveUser(user)));
    }
}