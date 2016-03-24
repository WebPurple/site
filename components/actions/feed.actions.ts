import {getJson} from "../utils/ajax";
import {IPost} from "../vo";
import {IAction} from "./actions";

export const REQUEST_POSTS = 'request_posts';

export function requestPosts(): IAction<void> {
    return {
        type: REQUEST_POSTS
    };
}

export const RECEIVE_POSTS = 'receive_posts';

export function receivePosts(posts: IPost[]): IAction<IPost[]> {
    return {
        type: RECEIVE_POSTS,
        payload: posts
    };
}

export function fetchPosts(): (action: any) => any {
    return (dispatch: Redux.Dispatch) => {
        dispatch(requestPosts());
        getJson('/api/posts')
            .then((postList: IPost[]) => dispatch(receivePosts(postList)));
    }
}