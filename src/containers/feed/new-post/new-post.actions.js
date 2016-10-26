import {
    OPEN_DIALOG,
    CLOSE_DIALOG,
    SUBMIT_POST_FORM,
} from './new-post.action-types';

import { postAdded } from './../feed.actions';

import { postJson } from '../../../utils/ajax';

export function openDialog() {
    return { type: OPEN_DIALOG };
}

export function closeDialog() {
    return { type: CLOSE_DIALOG };
}

export function formSubmitted() {
    return { type: SUBMIT_POST_FORM };
}

export function submitPostForm(post) {
    return (dispatch) => {
        dispatch(formSubmitted());
        postJson('api/posts', post)
            .then(savedPost => dispatch(postAdded(savedPost)));
    };
}
