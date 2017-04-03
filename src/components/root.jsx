import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

import routes from '../routes';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes)}
            </ConnectedRouter>
        </Provider>
    );
}
