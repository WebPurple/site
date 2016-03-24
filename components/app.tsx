import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import AppHeader from './react/app.header';
import Feed from './react/feed';
import NewPost from './react/post/new-post';
import appReducer from './reducers/app';
import {fetchPosts} from './actions/feed.actions';
import {fetchUser} from './actions/user.actions';

const App = () => (
    <div className='page'>
        <AppHeader/>
        <main className='container'>
            <Feed/>
        </main>
        <NewPost/>
    </div>
);

injectTapEventPlugin();

let store = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(fetchPosts());
store.dispatch(fetchUser());

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main')));
