import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    );
}
