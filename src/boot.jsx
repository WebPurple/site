import * as React from 'react';
import { render } from 'react-dom';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { AppContainer } from 'react-hot-loader';

import './polyfills';

import { fetchUser } from './actions/user.actions';

import configureStore from './configureStore';
import Root from './components/root';

const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// TODO: request data only on page opening
store.dispatch(fetchUser());

const renderApp = () => render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('main')
);

renderApp();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/root', () => {
        renderApp();
    });
}
