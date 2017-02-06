import * as React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/app/app';
import HomePage from './components/home-page/home-page';
import Feed from './containers/feed/feed';
import SettingsPage from './containers/settings.page';
import AboutPage from './components/about-page';

export default function configureRoutes(store) {
    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store);

    return () => (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="home" component={HomePage} />
                <Route path="feed" component={Feed} />
                <Route path="about" component={AboutPage} />
                <Route path="settings" component={SettingsPage} />
            </Route>
        </Router>
    );
}
