import * as React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './polyfills';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { reducer as formReducer } from 'redux-form';

import * as reducers from './reducers';
import { fetchUser } from './actions/user.actions';

import App from './containers/app/app';
import Feed from './containers/feed/feed';
import SettingsPage from './containers/settings.page';
import AboutPage from './components/about-page';

injectTapEventPlugin();

// Apply the middleware to the store
const routeMiddleware = routerMiddleware(browserHistory);

const middlewares = [thunkMiddleware, routeMiddleware];

if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
}

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer,
        form: formReducer,
    }),
    applyMiddleware(...middlewares)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// TODO: request data only on page opening
store.dispatch(fetchUser());

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Feed} />
                <Route path="feed" component={Feed} />
                <Route path="about" component={AboutPage} />
                <Route path="settings" component={SettingsPage} />
            </Route>
        </Router>
    </Provider>,
  document.getElementById('main')));
