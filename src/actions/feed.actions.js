import {getJson} from "../utils/ajax";

export const REQUEST_POSTS = 'request_posts';

export function requestPosts() {
    return {
        type: REQUEST_POSTS
    };
}

export const RECEIVE_POSTS = 'receive_posts';

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        payload: posts
    };
}

export function fetchPosts() {
    return (dispatch) => {
        dispatch(requestPosts());
        getJson('/api/posts')
            .then((postList) => dispatch(receivePosts(postList)));
    }
}