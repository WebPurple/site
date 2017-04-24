import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import * as reducers from './reducers';

export default function configureStore(history, preloadedState) {
    const rootReducer = combineReducers({
        ...reducers,
        router: routerReducer,
        form: formReducer,
    });

    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    let storeEnhancer = applyMiddleware(...middlewares);

    if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        storeEnhancer = composeEnhancers(storeEnhancer);
    }
    return createStore(
        rootReducer,
        preloadedState,
        storeEnhancer,
    );
}
