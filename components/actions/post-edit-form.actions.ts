import {IAction} from "./actions";
import {IPost} from "../vo/index";

export const SUBMIT_POST_FORM = 'submit_post_form';

export function submitPostForm(post: IPost): IAction<IPost> {
    return {
        type: SUBMIT_POST_FORM,
        payload: post
    }
}

export const DEFERRED_POST = 'deferred_post';

export function toggleDeferredPost(): IAction<void> {
    return {
        type: DEFERRED_POST
    }
}