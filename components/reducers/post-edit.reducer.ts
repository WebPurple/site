import {DEFERRED_POST, CHANGE_POST_TITLE, CHANGE_POST_TEXT, POST_ADDED} from "../actions/post-edit-form.actions";
import {IAction} from "../actions/actions";

const editPost = (state = {post: {}, deferredPost: false}, action: IAction<any>) => {
    switch (action.type) {
        case CHANGE_POST_TITLE:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {title: action.payload})
            });
        case CHANGE_POST_TEXT:
            return Object.assign({}, state, {
                post: Object.assign({}, state.post, {text: action.payload})
            });
        case DEFERRED_POST:
            return Object.assign({}, state, {deferredPost: !state.deferredPost});
        case POST_ADDED:
            return Object.assign({}, state, {post: {}});
        default:
            return state;
    }
};

export default editPost;