import { combineReducers, createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import * as reducers from './reducers';

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer,
});

const middlewares = [thunkMiddleware, routerMiddleware(browserHistory)];

if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middlewares)
    );
}
