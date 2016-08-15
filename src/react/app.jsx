import * as React from 'react';

import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple500, purple700, purple100 } from 'material-ui/styles/colors';

import AppHeader from './app.header';
import AppLeftNav from './app-left-nav';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple500,
        primary2Color: purple700,
        primary3Color: purple100,
    },
});

/* eslint-disable prefer-template */
const App = ({ leftNavOpen, children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div className="page">
            <AppHeader />
            <main className={'container' + (leftNavOpen ? ' container--with-left-nav' : '')}>
                {children}
            </main>
            <AppLeftNav />
        </div>
    </MuiThemeProvider>
);

const AppContainer = connect(state => state.leftNav)(App);

export default AppContainer;
