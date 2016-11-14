import { getJson, deleteJson } from '../../utils/ajax';

import { POST_ADDED } from './feed.action-types';

export const REQUEST_POSTS = 'request_posts';

export function requestPosts() {
    return {
        type: REQUEST_POSTS,
    };
}

export const RECEIVE_POSTS = 'receive_posts';

export function receivePosts(posts, type, from, limit) {
    return {
        type: RECEIVE_POSTS,
        payload: { posts, type, from, limit },
    };
}

export function fetchPosts(type, from = 0, limit) {
    return (dispatch) => {
        dispatch(requestPosts());
        return getJson('/api/posts', { type, from, limit })
            .then((postList) => dispatch(receivePosts(postList, type, from, limit)));
    };
}

export const POST_REMOVED = 'post_removed';

export function postRemoved(post) {
    return {
        type: POST_REMOVED,
        payload: post,
    };
}

export function deletePost(id) {
    return dispatch => deleteJson(`/api/posts/${id}`)
        .then(removedPost => dispatch(postRemoved(removedPost)));
}

export function postAdded(postOrError, failed) {
    return {
        type: POST_ADDED,
        payload: postOrError,
        error: failed,
    };
}
