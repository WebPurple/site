import * as React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './reducers/app.reducer';
import { fetchUser } from './actions/user.actions';

import App from './containers/app';
import FeedPage from './containers/feed.page';
import SettingsPage from './containers/settings.page';

injectTapEventPlugin();

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory);

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer,
    }),
    applyMiddleware(thunkMiddleware, middleware)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// TODO: request data only on page opening
store.dispatch(fetchUser());

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={FeedPage} />
                <Route path="feed" component={FeedPage} />
                <Route path="settings" component={SettingsPage} />
            </Route>
        </Router>
    </Provider>,
  document.getElementById('main')));
