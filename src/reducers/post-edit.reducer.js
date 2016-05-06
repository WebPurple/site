import {
    DEFERRED_POST,
    CHANGE_POST_TEXT,
    POST_ADDED,
    SUBMIT_POST_FORM,
    EXPORT_TO_FACEBOOK,
    CHANGE_POST_IMAGE,
    CHANGE_POST_LINK,
    CHANGE_POST_LINK_TITLE
} from "../actions/post-edit-form.actions";

const editPost = (state = {post: {text: ''}, deferredPost: false}, action) => {
    switch (action.type) {
        case CHANGE_POST_LINK:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {link: action.payload})
            });
        case CHANGE_POST_TEXT:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {text: action.payload})
            });
        case CHANGE_POST_LINK_TITLE:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {linkTitle: action.payload})
            });
        case CHANGE_POST_IMAGE:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {imageLink: action.payload})
            });
        case DEFERRED_POST:
            return Object.assign({}, state, {deferredPost: !state.deferredPost});
        case EXPORT_TO_FACEBOOK:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {exportToFacebook: action.payload})
            });
        case SUBMIT_POST_FORM:
            return Object.assign({}, state, {isFetching: true});
        case POST_ADDED:
            return Object.assign({}, state, {post: {text: ''}, isFetching: false});
        default:
            return state;
    }
};

export default editPost;