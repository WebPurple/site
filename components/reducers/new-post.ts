import {combineReducers} from 'redux';
import postEditor from './post-edit';

let newPost = (state = {dialogOpen: false}, action: {type: string}) => {
    switch (action.type) {
        case 'OPEN_DIALOG':
            return Object.assign({}, state, {dialogOpen: true});
        case 'CLOSE_DIALOG':
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