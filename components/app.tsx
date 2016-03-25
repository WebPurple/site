import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import * as getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import * as MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {purple500, purple700, purple100} from 'material-ui/lib/styles/colors';

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import AppHeader from './react/app.header';
import Feed from './react/feed';
import NewPost from './react/post/new-post';
import appReducer from './reducers/app.reducer';
import {fetchPosts} from './actions/feed.actions';
import {fetchUser} from './actions/user.actions';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple500,
        primary2Color: purple700,
        primary3Color: purple100
    },
});

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div className='page'>
            <AppHeader/>
            <main className='container'>
                <Feed/>
            </main>
            <NewPost/>
        </div>
    </MuiThemeProvider>
);

injectTapEventPlugin();

let store = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(fetchPosts());
store.dispatch(fetchUser());

document.addEventListener('DOMContentLoaded', () => render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main')));
