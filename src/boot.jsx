import * as React from 'react';
import { render } from 'react-dom';

import createHistory from 'history/createBrowserHistory';

import { AppContainer } from 'react-hot-loader';

import './polyfills';

import { fetchUser } from './reducers/user.reducer';

import configureStore from './configureStore';
import Root from './components/root';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = configureStore(history);

// TODO: request data only on page opening
store.dispatch(fetchUser());

const renderApp = () => render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('main'),
);

renderApp();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/root', () => {
        renderApp();
    });
}
