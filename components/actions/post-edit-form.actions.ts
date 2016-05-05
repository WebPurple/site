import {IAction} from "./actions";
import {IPost} from "../vo/index";
import {postJson} from "../utils/ajax";
import {queryPageInfo} from "../utils/page-info"

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

export const CHANGE_POST_TEXT = 'change_post_text';

export function changePostText(newText) {
    return {
        type: CHANGE_POST_TEXT,
        payload: newText
    }
}

export const EXPORT_TO_FACEBOOK = 'export_to_facebook';

export function toggleExportToFacebook(checked): IAction<boolean> {
    return {
        type: EXPORT_TO_FACEBOOK,
        payload: checked
    };
}

export const CHANGE_POST_IMAGE = 'change_post_image';

export function changePostImage(newImageLink: string): IAction<string> {
    return {
        type: CHANGE_POST_IMAGE,
        payload: newImageLink
    }
}

export const CHANGE_POST_LINK = 'change_post_link';

export function changePostLink(newLink) {
    return (dispatch: Redux.Dispatch) => {
        dispatch({
            type: CHANGE_POST_LINK,
            payload: newLink
        });
        queryPageInfo(newLink)
            .then(pageInfo => {
                dispatch({
                    type: CHANGE_POST_TEXT,
                    payload: pageInfo.description
                });
                dispatch({
                    type: CHANGE_POST_LINK_TITLE,
                    payload: pageInfo.title
                });
                dispatch({
                    type: CHANGE_POST_IMAGE,
                    payload: pageInfo.imageUrl
                });
            });
    };
}

export const CHANGE_POST_LINK_TITLE = 'change_post_link_title';

export function changePostLinkTitle(newLinkTitle): IAction<String> {
    return {
        type: CHANGE_POST_LINK_TITLE,
        payload: newLinkTitle
    }
}

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';