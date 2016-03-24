import {IAction} from "./actions";
import {IPost} from "../vo/index";
import {postJson} from "../utils/ajax";

export const SUBMIT_POST_FORM = 'submit_post_form';
export const POST_ADDED = 'post_saved';

export function submitPostForm(post: IPost) {
    return (dispatch: Redux.Dispatch) => {
        dispatch({type: SUBMIT_POST_FORM});
        postJson('api/posts', post)
            .then(savedPost => dispatch({
                type: POST_ADDED,
                payload: savedPost
            }));
    };
}

export const DEFERRED_POST = 'deferred_post';

export function toggleDeferredPost(): IAction<void> {
    return {
        type: DEFERRED_POST
    }
}

export const CHANGE_POST_TITLE = 'change_post_title';

export function changePostTitle(newTitle) {
    return {
        type: CHANGE_POST_TITLE,
        payload: newTitle
    }
}

export const CHANGE_POST_TEXT = 'change_post_text';

export function changePostText(newText) {
    return {
        type: CHANGE_POST_TEXT,
        payload: newText
    }
}