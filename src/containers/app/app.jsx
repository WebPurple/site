import * as React from 'react';

import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { purple500, purple700, purple100 } from 'material-ui/styles/colors';

import classNames from 'classnames/bind';

import AppHeader from '../../components/app.header';
import NavigationBar from '../../containers/navigation/navigation-bar';

import styles from './main.less';

const cx = classNames.bind(styles);

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple500,
        primary2Color: purple700,
        primary3Color: purple100,
    },
});

const AppContainer = ({ leftNavOpen, children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.page}>
            <AppHeader />
            <main
                className={cx({
                    container: true,
                    'container--with-left-nav': leftNavOpen,
                })}>
                {children}
            </main>
            <NavigationBar />
        </div>
    </MuiThemeProvider>
);

AppContainer.propTypes = {
    leftNavOpen: React.PropTypes.bool
};

export default connect(state => state.leftNav)(AppContainer);
