import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import appReducer from './reducers/app.reducer';
import {fetchPosts} from './actions/feed.actions';
import {fetchUser} from './actions/user.actions';

import App from './react/app';

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
