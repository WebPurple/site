import { createAction } from 'redux-actions';

import {
    getJson,
    putJson,
} from '../utils/ajax';

export const REQUEST_USER = 'request_user';
export const RECEIVE_USER = 'receive_user';
export const SAVE_USER = 'save_user';
export const REQUEST_ALL_USERS = 'request_all_users';
export const RECEIVE_ALL_USERS = 'receive_all_users';
export const REQUEST_ROLES = 'request_roles';
export const RECEIVE_ROLES = 'receive_roles';
export const ROLE_ADDED = 'role_added';
export const ROLE_REMOVED = 'role_removed';

export default function userReducer(state = {}, action) {
    switch (action.type) {
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
}

export const requestUser = createAction(REQUEST_USER);
export const receiveUser = createAction(RECEIVE_USER);

export function fetchUser() {
    return dispatch => {
        dispatch(requestUser());
        return getJson('/api/user')
            .then(user => dispatch(receiveUser(user)))
            .catch(err => dispatch(receiveUser(err)));
    };
}

export function saveUser(user) {
    return dispatch => {
        dispatch({
            type: SAVE_USER,
            payload: user,
        });
        return putJson(`/api/users/${user._id}`, user)
            .then(updatedUser => dispatch(receiveUser(updatedUser)));
    };
}

export const requestAllUsers = createAction(REQUEST_ALL_USERS);
export const receiveAllUsers = createAction(RECEIVE_ALL_USERS);

export function fetchAllUsers() {
    return dispatch => {
        dispatch(requestAllUsers());
        return getJson('/api/users')
            .then(users => dispatch(receiveAllUsers(users)));
    };
}

export const requestRoles = createAction(REQUEST_ROLES);
export const receiveRoles = createAction(RECEIVE_ROLES);

export function fetchRoles() {
    return dispatch => {
        dispatch(requestRoles());
        return getJson('/api/roles')
            .then(roles => dispatch(receiveRoles(roles)));
    };
}

export const roleAdded = createAction(ROLE_ADDED);

export function addRole({ user, userRole }) {
    return dispatch => {
        const roles = [userRole].concat(user.roles);
        putJson(`/api/users/${user._id}`, { roles })
            .then(updatedUser => dispatch(roleAdded(updatedUser)));
    };
}

export const roleRemoved = createAction(ROLE_REMOVED);

export function removeRole(user, roleToRemove) {
    return dispatch => {
        const roles = user.roles.filter(role => role !== roleToRemove);
        putJson(`/api/users/${user._id}`, { roles })
            .then(updatedUser => dispatch(roleRemoved(updatedUser)));
    };
}
