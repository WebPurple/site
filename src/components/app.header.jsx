import * as React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';

import LoginComponent from './login.component';
import UserAvatar from './user-avatar.component';
import { toggleLeftNav } from '../containers/navigation/navigation-bar.actions';

const AppHeaderComponent = ({ user, onToggleLeftNav, leftNavOpen }) => (
    <AppBar
        style={{ position: 'fixed', left: 0 }}
        title={renderTitle(user)}
        iconElementLeft={<LeftIcon leftNavOpen={leftNavOpen} onToggleLeftNav={onToggleLeftNav} />}
        iconElementRight={<RightMenu user={user.account} isFetching={user.isFetching} />} />
);

AppHeaderComponent.propTypes = {
    user: React.PropTypes.object,
    onToggleLeftNav: React.PropTypes.func,
    leftNavOpen: React.PropTypes.bool,
    onSettingsClick: React.PropTypes.func,
};

function renderTitle(user) {
    // eslint-disable-next-line prefer-template
    return 'WebPurple' + (user.account && user.account._id ? ` | ${user.account.displayName}` : '');
}

const LeftIcon = ({ leftNavOpen, onToggleLeftNav }) => (
    <IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu />}</IconButton>
);

const RightMenu = ({ user, isFetching }) => (
    user && user._id ? <UserAvatar user={user} />
        : isFetching ? <CircularProgress color="#fff" size={0.5} />
            : <LoginComponent />
);

const AppHeaderContainer = connect(
    state => Object.assign({}, { user: state.user }, { leftNavOpen: state.leftNav.leftNavOpen }),
    dispatch => ({
        onToggleLeftNav: () => dispatch(toggleLeftNav()),
    })
)(AppHeaderComponent);

export default AppHeaderContainer;
