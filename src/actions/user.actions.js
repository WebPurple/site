import {
    getJson,
    putJson,
} from '../utils/ajax';

export const REQUEST_USER = 'request_user';

export function requestUser() {
    return {
        type: REQUEST_USER,
    };
}

export const RECEIVE_USER = 'receive_user';

export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        payload: user,
    };
}

export function fetchUser() {
    return (dispatch) => {
        dispatch(requestUser());
        return getJson('/api/user')
            .then(user => dispatch(receiveUser(user)))
            .catch(() => dispatch(receiveUser()));
    };
}

export const SAVE_USER = 'save_user';

export function saveUser(user) {
    return (dispatch) => {
        dispatch({ type: SAVE_USER, payload: user });
        return putJson(`/api/users/${user._id}`, user)
            .then(updatedUser => dispatch(receiveUser(updatedUser)));
    };
}

export const REQUEST_ALL_USERS = 'request_all_users';

export function requestAllUsers() {
    return {
        type: REQUEST_ALL_USERS,
    };
}

export const RECEIVE_ALL_USERS = 'receive_all_users';

export function receiveAllUsers(users) {
    return {
        type: RECEIVE_ALL_USERS,
        payload: users,
    };
}

export function fetchAllUsers() {
    return (dispatch) => {
        dispatch(requestAllUsers());
        return getJson('/api/users')
            .then(users => dispatch(receiveAllUsers(users)));
    };
}

export const REQUEST_ROLES = 'request_roles';

export function requestRoles() {
    return {
        type: REQUEST_ROLES,
    };
}

export const RECEIVE_ROLES = 'receive_roles';

export function receiveRoles(roles) {
    return {
        type: RECEIVE_ROLES,
        payload: roles,
    };
}

export function fetchRoles() {
    return dispatch => {
        dispatch(requestRoles());
        return getJson('/api/roles')
            .then(roles => dispatch(receiveRoles(roles)));
    };
}

export const ROLE_ADDED = 'role_added';

function roleAdded(user) {
    return {
        type: ROLE_ADDED,
        payload: user,
    };
}

export function addRole({ user, userRole }) {
    return dispatch => {
        const roles = [userRole].concat(user.roles);
        putJson(`/api/users/${user._id}`, { roles })
            .then(updatedUser => dispatch(roleAdded(updatedUser)));
    };
}

export const ROLE_REMOVED = 'role_removed';

function roleRemoved(user) {
    return {
        type: ROLE_REMOVED,
        payload: user,
    };
}

export function removeRole(user, roleToRemove) {
    return dispatch => {
        const roles = user.roles.filter(role => role !== roleToRemove);
        putJson(`/api/users/${user._id}`, { roles })
            .then(updatedUser => dispatch(roleRemoved(updatedUser)));
    };
}
