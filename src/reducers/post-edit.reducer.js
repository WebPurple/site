import {
    DEFERRED_POST,
    CHANGE_POST_TEXT,
    POST_ADDED,
    SUBMIT_POST_FORM,
    EXPORT_TO_FACEBOOK,
    CHANGE_POST_IMAGE,
    CHANGE_POST_LINK,
    CHANGE_POST_LINK_TITLE,
} from '../actions/post-edit-form.actions';

const editPost = (state = { post: { text: '' }, deferredPost: false }, action) => {
    switch (action.type) {
        case CHANGE_POST_LINK:
            return {
                ...state,
                post: {
                    ...state.post,
                    link: action.payload,
                },
            };
        case CHANGE_POST_TEXT:
            return {
                ...state,
                post: {
                    ...state.post,
                    text: action.payload,
                },
            };
        case CHANGE_POST_LINK_TITLE:
            return {
                ...state,
                post: {
                    ...state.post,
                    linkTitle: action.payload,
                },
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
        case SUBMIT_POST_FORM:
            return {
                ...state,
                isFetching: true,
            };
        case POST_ADDED:
            return {
                ...state,
                post: { text: '' },
                isFetching: false,
            };
        default:
            return state;
    }
};

export default editPost;
