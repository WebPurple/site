import { fromJS, List } from 'immutable';

import { POST_ADDED } from './feed.action-types';
import { REQUEST_POSTS, RECEIVE_POSTS, POST_REMOVED } from './feed.actions';

const initialState = fromJS({
    isFetching: false,
    posts: [],
});

const feed = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return state.set('isFetching', true);
        case RECEIVE_POSTS:
            return state.withMutations(mutableState => mutableState
                .set('isFetching', false)
                .set('allPostsLoaded', action.payload.posts.length < action.payload.limit)
                .update('posts', posts => action.payload.from === 0
                    ? new List(action.payload.posts)
                    : posts.concat(action.payload.posts)));
        case POST_ADDED:
            return action.error ? state
                : state.update('posts', posts => posts.unshift(action.payload));
        case POST_REMOVED:
            return state.update('posts', posts => posts.filter(post => post._id !== action.payload._id));
        default:
            return state;
    }
};

export default feed;
