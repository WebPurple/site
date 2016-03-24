import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import AppHeader from './react/app.header';
import Feed from './react/feed';
import NewPost from './react/post/new-post';
import appReducer from './reducers/app';
import {fetchPosts} from './reducers/feed';

const App = ({header, feed, newPost}: {header?: any, feed?: any, newPost?: any}) => (
    <div className='page'>
        <AppHeader {...header}/>
        <main className='container'>
            <Feed {...feed}/>
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

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main')));
