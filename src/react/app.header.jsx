import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var AppBar = require('material-ui/lib/app-bar');
var IconButton = require('material-ui/lib/icon-button');
var Menu = require('material-ui/lib/svg-icons/navigation/menu');
var NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
var CircularProgress = require('material-ui/lib/circular-progress');

import LoginComponent from './login.component';
import UserAvatar from './user-avatar.component';
import {toggleLeftNav} from '../actions/left-nav.actions';

const AppHeaderComponent = ({user, onToggleLeftNav, leftNavOpen, onAvatarClick}) => (
    <AppBar style={{position: 'fixed'}} title={renderTitle(user)}
            iconElementLeft={<LeftIcon leftNavOpen={leftNavOpen} onToggleLeftNav={onToggleLeftNav}/>}
            iconElementRight={<RightMenu user={user.account} isFetching={user.isFetching} onAvatarClick={onAvatarClick}/>}/>
);

function renderTitle(user) {
    return 'WebPurple' + (user.account && user.account._id ? ` | ${user.account.displayName}` : '');
}

const LeftIcon = ({leftNavOpen, onToggleLeftNav}) => (
    <IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu/>}</IconButton>
);

const RightMenu = ({user, isFetching, onAvatarClick}) => (
    user && user._id ? <UserAvatar user={user} onTouchTap={onAvatarClick}/>
        : isFetching ? <CircularProgress color="#fff" size={0.5}/>
        : <LoginComponent />
);

const AppHeaderContainer = connect(
    state => Object.assign({}, {user: state.user}, {leftNavOpen: state.leftNav.leftNavOpen}),
    dispatch => {
        return {
            onToggleLeftNav: () => dispatch(toggleLeftNav()),
            onAvatarClick: () => dispatch(push('/settings'))
        }
    }
)(AppHeaderComponent);

export default AppHeaderContainer;