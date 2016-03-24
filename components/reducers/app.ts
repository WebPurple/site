import {combineReducers} from 'redux';

import header from './header.reducer';
import feed from './feed.reducer';
import newPost from './new-post';

const app = combineReducers({
    header,
    feed,
    newPost
});

export default app;