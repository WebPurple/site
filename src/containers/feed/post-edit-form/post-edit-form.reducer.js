import {
    DEFERRED_POST,
    CHANGE_POST_COMMENT,
    POST_ADDED,
    CLOSE_DIALOG,
    SUBMIT_POST_FORM,
    EXPORT_TO_FACEBOOK,
    CHANGE_POST_IMAGE,
    RECEIVE_LINK_INFO,
    FETCH_LINK_INFO,
    CLEAR_SNIPPET,
} from './post-edit-form.actions';

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
        default:
            return state;
    }
};

export default editPost;
