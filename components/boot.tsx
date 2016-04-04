import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './reducers/app.reducer';
import {fetchPosts} from './actions/feed.actions';
import {fetchUser} from './actions/user.actions';

import App from './react/app';
import Feed from './react/pages/feed.page';
import Settings from './react/pages/settings.page';

injectTapEventPlugin();

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory);

let store = createStore(
    combineReducers(Object.assign(reducers, {
        routing: routerReducer
    })),
    applyMiddleware(thunkMiddleware, middleware)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(fetchPosts());
store.dispatch(fetchUser());

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Feed}/>
                <Route path="feed" component={Feed}/>
                <Route path="settings" component={Settings}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main')));
