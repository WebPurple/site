import { combineReducers } from 'redux';
import postEditor from '../post-edit-form/post-edit-form.reducer';
import { OPEN_DIALOG, CLOSE_DIALOG, EDIT_POST, CLOSE_ERROR_DIALOG } from './new-post.action-types';
import { POST_ADDED } from './../feed.action-types';

const newPostReducer = (state = { dialogOpen: false }, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return { ...state, dialogOpen: true };
        case POST_ADDED:
            return action.error
                ? { ...state, error: action.payload }
                : { ...state, dialogOpen: false };
        case CLOSE_ERROR_DIALOG:
            return { ...state, error: undefined };
        case CLOSE_DIALOG:
            return { ...state, dialogOpen: false };
        case EDIT_POST:
            return {
                ...state,
                dialogOpen: true,
            };
        default:
            return state;
    }
};

const newPost = combineReducers({
    state: newPostReducer,
    postEditor,
});

export default newPost;
