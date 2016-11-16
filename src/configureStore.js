import { combineReducers, createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import * as reducers from './reducers';

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer,
});

const middlewares = [thunkMiddleware, routerMiddleware(browserHistory)];
let storeEnhancer = applyMiddleware(...middlewares);

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    storeEnhancer = composeEnhancers(storeEnhancer)
}

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        storeEnhancer
    );
}
