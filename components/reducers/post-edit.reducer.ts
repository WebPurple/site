import {
    DEFERRED_POST, CHANGE_POST_TEXT, POST_ADDED,
    SUBMIT_POST_FORM, EXPORT_TO_FACEBOOK
} from "../actions/post-edit-form.actions";
import {IAction} from "../actions/actions";
import {CHANGE_POST_IMAGE} from "../actions/post-edit-form.actions";

const editPost = (state = {post: {text: ''}, deferredPost: false}, action: IAction<any>) => {
    switch (action.type) {
        case CHANGE_POST_TEXT:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {text: action.payload})
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