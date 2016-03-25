import * as React from 'react';

import {connect} from 'react-redux'

import * as getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import * as MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {purple500, purple700, purple100} from 'material-ui/lib/styles/colors';

import AppHeader from './app.header';
import AppLeftNav from './app-left-nav';
import Feed from './feed';
import NewPost from './post/new-post';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple500,
        primary2Color: purple700,
        primary3Color: purple100
    },
});

const App = ({leftNavOpen}) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div className='page'>
            <AppHeader/>
            <main className='container' style={{marginLeft: leftNavOpen ? 150 : 0}}>
                <Feed/>
            </main>
            <AppLeftNav/>
            <NewPost/>
        </div>
    </MuiThemeProvider>
);

const AppContainer = connect(state => state.leftNav)(App);

export default AppContainer;