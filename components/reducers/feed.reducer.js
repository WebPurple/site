import {REQUEST_POSTS, RECEIVE_POSTS} from "../actions/feed.actions";
import {POST_ADDED} from "../actions/post-edit-form.actions";

const feed = (state = {isFetching: false, posts: []}, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                posts: action.payload
            });
        case POST_ADDED:
            return Object.assign({}, state, {
                posts: [action.payload].concat(state.posts)
            });
        default:
            return state;
    }
};

export default feed;
