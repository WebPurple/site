import * as React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Provider } from 'react-redux';

import './polyfills';

import { fetchUser } from './actions/user.actions';

import App from './containers/app/app';
import Feed from './containers/feed/feed';
import SettingsPage from './containers/settings.page';
import AboutPage from './components/about-page';

import configureStore from './configureStore';

const store = configureStore();

injectTapEventPlugin();

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
