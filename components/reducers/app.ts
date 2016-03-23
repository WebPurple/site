import {combineReducers} from 'redux';

import header from './header';
import feed from './feed';
import newPost from './new-post';

const app = combineReducers({
    header,
    feed,
    newPost
});

export default app;