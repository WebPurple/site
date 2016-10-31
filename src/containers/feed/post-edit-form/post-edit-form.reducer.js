import {
    DEFERRED_POST,
    CHANGE_POST_COMMENT,
    EXPORT_TO_FACEBOOK,
    CHANGE_POST_IMAGE,
    RECEIVE_LINK_INFO,
    FETCH_LINK_INFO,
    CLEAR_SNIPPET,
} from './post-edit-form.actions';
import { CLOSE_DIALOG, SUBMIT_POST_FORM, EDIT_POST } from './../new-post/new-post.action-types';
import { POST_ADDED } from './../feed.action-types';

const defaultState = { post: { comment: '' }, isFetching: false };

const editPost = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_POST_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comment: action.payload,
                },
            };
        case RECEIVE_LINK_INFO:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload,
                },
                isFetching: false,
            };
        case CHANGE_POST_IMAGE:
            return {
                ...state,
                post: {
                    ...state.post,
                    imageLink: action.payload,
                },
            };
        case DEFERRED_POST:
            return {
                ...state,
                deferredPost: !state.deferredPost,
            };
        case EXPORT_TO_FACEBOOK:
            return {
                ...state,
                post: {
                    ...state.post,
                    exportToFacebook: action.payload,
                },
            };
        case FETCH_LINK_INFO:
        case SUBMIT_POST_FORM:
            return {
                ...state,
                isFetching: true,
            };
        case CLOSE_DIALOG:
        case POST_ADDED:
            return defaultState;
        case CLEAR_SNIPPET:
            return {
                ...state,
                post: {
                    comment: state.post.comment,
                },
            };
        case EDIT_POST:
            return {
                ...state,
                post: {
                    ...action.payload,
                    type: undefined, // we should remove 'suggest', 'draft' types
                },
            };
        default:
            return state;
    }
};

export default editPost;
