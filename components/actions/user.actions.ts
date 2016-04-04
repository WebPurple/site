import {getJson, putJson} from "../utils/ajax";
import {IAction} from "./actions";
import {IUser} from "../vo/index";

export const REQUEST_USER = 'request_user';

export function requestUser(): IAction<void> {
    return {
        type: REQUEST_USER
    };
}

export const RECEIVE_USER = 'receive_user';

export function receiveUser(user: IUser): IAction<IUser> {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export function fetchUser() {
    return (dispatch: Redux.Dispatch) => {
        dispatch(requestUser());
        return getJson('/api/user')
            .then(user => dispatch(receiveUser(user)))
            .catch(err => dispatch(receiveUser(err)));
    }
}

export const CHANGE_USER_NAME = 'change_user_name';

export function changeUserName(newName: string): IAction<string> {
    return {
        type: CHANGE_USER_NAME,
        payload: newName
    }
}

export const SAVE_USER = 'save_user';

export function saveUser(user: IUser) {
    return (dispatch: Redux.Dispatch) => {
        dispatch({type: SAVE_USER, payload: user});
        return putJson(`/api/users/${user._id}`, user)
            .then(user => dispatch(receiveUser(user)));
    }
}