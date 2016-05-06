import {combineReducers} from 'redux';
import postEditor from './post-edit.reducer';
import {POST_ADDED, OPEN_DIALOG, CLOSE_DIALOG} from "../actions/post-edit-form.actions";

let newPost = (state = {dialogOpen: false}, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return Object.assign({}, state, {dialogOpen: true});
        case POST_ADDED:
        case CLOSE_DIALOG:
            return Object.assign({}, state, {dialogOpen: false});
        default:
            return state;
    }
};

newPost = combineReducers({
    state: newPost,
    postEditor
});

export default newPost;