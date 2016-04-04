import * as React from 'react';

import {connect} from 'react-redux';
import {push} from 'react-router-redux'

import * as AppBar from 'material-ui/lib/app-bar';
import * as Avatar from 'material-ui/lib/avatar';
import * as SocialPerson from "material-ui/lib/svg-icons/social/person";
import * as IconButton from "material-ui/lib/icon-button";
import * as Menu from "material-ui/lib/svg-icons/navigation/menu";
import * as NavigationClose from "material-ui/lib/svg-icons/navigation/close";

import LoginComponent from './login.component';
import {toggleLeftNav} from "../actions/left-nav.actions";

//TODO: create user settings page and displayName property
function getUserName(user) {
    return user.vkDisplayName || user.fbDisplayName;
}

const AppAvatar = ({user, onTouchTap}) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} onTouchTap={onTouchTap}/>
        : <Avatar icon={<SocialPerson/>} onTouchTap={onTouchTap}/>
);

const AppHeaderComponent = ({user, onToggleLeftNav, leftNavOpen, onAvatarClick}) => (
    <AppBar style={{position: 'fixed'}} title={'WebPurple' + (user ? ` | ${getUserName(user)}` : '')}
            iconElementLeft={<IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu/>}</IconButton>}
            iconElementRight={user ? <AppAvatar user={user} onTouchTap={onAvatarClick} /> : <LoginComponent />}/>
);

const AppHeaderContainer = connect(
    state => Object.assign({}, {user: state.user}, {leftNavOpen: state.leftNav.leftNavOpen}),
    (dispatch: Redux.Dispatch) => {
        return {
            onToggleLeftNav: () => dispatch(toggleLeftNav()),
            onAvatarClick: () => dispatch(push('/settings'))
        }
    }
)(AppHeaderComponent);

export default AppHeaderContainer;