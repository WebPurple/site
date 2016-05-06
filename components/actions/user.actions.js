import {getJson, putJson} from "../utils/ajax";

export const REQUEST_USER = 'request_user';

export function requestUser() {
    return {
        type: REQUEST_USER
    };
}

export const RECEIVE_USER = 'receive_user';

export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export function fetchUser() {
    return (dispatch) => {
        dispatch(requestUser());
        return getJson('/api/user')
            .then(user => dispatch(receiveUser(user)))
            .catch(err => dispatch(receiveUser(err)));
    }
}

export const CHANGE_USER_NAME = 'change_user_name';

export function changeUserName(newName) {
    return {
        type: CHANGE_USER_NAME,
        payload: newName
    }
}

export const SAVE_USER = 'save_user';

export function saveUser(user) {
    return (dispatch) => {
        dispatch({type: SAVE_USER, payload: user});
        return putJson(`/api/users/${user._id}`, user)
            .then(user => dispatch(receiveUser(user)));
    }
}

export const REQUEST_ALL_USERS = 'request_all_users';

export function requestAllUsers() {
    return {
        type: REQUEST_ALL_USERS
    }
}

export const RECEIVE_ALL_USERS = 'receive_all_users';

export function receiveAllUsers(users) {
    return {
        type: RECEIVE_ALL_USERS,
        payload: users
    }
}

export function fetchAllUsers() {
    return (dispatch) => {
        dispatch(requestAllUsers());
        return getJson('/api/users')
            .then(users => dispatch(receiveAllUsers(users)));
    }
}