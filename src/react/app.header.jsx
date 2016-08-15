import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CircularProgress from 'material-ui/CircularProgress';

import LoginComponent from './login.component';
import UserAvatar from './user-avatar.component';
import { toggleLeftNav } from '../actions/left-nav.actions';

const AppHeaderComponent = ({ user, onToggleLeftNav, leftNavOpen, onAvatarClick }) => (
    <AppBar
        style={{ position: 'fixed' }}
        title={renderTitle(user)}
        iconElementLeft={<LeftIcon leftNavOpen={leftNavOpen} onToggleLeftNav={onToggleLeftNav} />}
        iconElementRight={<RightMenu user={user.account} isFetching={user.isFetching} onAvatarClick={onAvatarClick} />} />
);

function renderTitle(user) {
    // eslint-disable-next-line prefer-template
    return 'WebPurple' + (user.account && user.account._id ? ` | ${user.account.displayName}` : '');
}

const LeftIcon = ({ leftNavOpen, onToggleLeftNav }) => (
    <IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu />}</IconButton>
);

const RightMenu = ({ user, isFetching, onAvatarClick }) => (
    user && user._id ? <UserAvatar user={user} onTouchTap={onAvatarClick} />
        : isFetching ? <CircularProgress color="#fff" size={0.5} />
            : <LoginComponent />
);

const AppHeaderContainer = connect(
    state => Object.assign({}, { user: state.user }, { leftNavOpen: state.leftNav.leftNavOpen }),
    dispatch => ({
        onToggleLeftNav: () => dispatch(toggleLeftNav()),
        onAvatarClick: () => dispatch(push('/settings')),
    })
)(AppHeaderComponent);

export default AppHeaderContainer;
