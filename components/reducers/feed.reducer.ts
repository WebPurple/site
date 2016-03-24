import {REQUEST_POSTS, RECEIVE_POSTS} from "../actions/feed.actions";
import {IAction} from "../actions/actions";

const feed = (state = {isFetching: false, posts: []}, action: IAction<any>) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                posts: action.payload
            });
        default:
            return state;
    }
};

export default feed;
