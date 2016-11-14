import {
    OPEN_DIALOG,
    CLOSE_DIALOG,
    SUBMIT_POST_FORM,
    EDIT_POST,
    CLOSE_ERROR_DIALOG,
} from './new-post.action-types';

import { postAdded } from './../feed.actions';

import { postJson, putJson } from '../../../utils/ajax';

export function openDialog() {
    return { type: OPEN_DIALOG };
}

export function closeDialog() {
    return { type: CLOSE_DIALOG };
}

export function closeErrorDialog() {
    return { type: CLOSE_ERROR_DIALOG };
}

export function editPost(post) {
    return { type: EDIT_POST, payload: post };
}

export function formSubmitted() {
    return { type: SUBMIT_POST_FORM };
}

export function submitPostForm(post) {
    return (dispatch) => {
        dispatch(formSubmitted());
        const { _id } = post;
        return (_id ? putJson : postJson)(`/api/posts/${_id || ''}`, post)
            .then(savedPost => dispatch(postAdded(savedPost)))
            .catch(error => dispatch(postAdded(error, true)));
    };
}
