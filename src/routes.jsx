import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/app';
import HomePage from './components/home-page/home-page';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="home" component={HomePage} />
    </Route>
);
