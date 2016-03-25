import {combineReducers} from 'redux';

import header from './header.reducer';
import feed from './feed.reducer';
import newPost from './new-post.reducer';
import leftNav from './left-nav.reducer';

const app = combineReducers({
    header,
    feed,
    newPost,
    leftNav
});

export default app;