import { REQUEST_POSTS, RECEIVE_POSTS, POST_REMOVED } from './feed.actions';
import { POST_ADDED } from './post-edit-form/post-edit-form.actions';

const feed = (state = { isFetching: false, posts: [] }, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return { ...state, isFetching: true };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                posts: action.payload,
            };
        case POST_ADDED:
            return {
                ...state,
                posts: [action.payload].concat(state.posts),
            };
        case POST_REMOVED:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export default feed;
