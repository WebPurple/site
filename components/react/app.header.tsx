import * as React from 'react';

import {connect} from 'react-redux';

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

const AppAvatar = ({user}) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl}/>
        : <Avatar icon={<SocialPerson/>}/>
);

const AppHeaderComponent = ({user, onToggleLeftNav, leftNavOpen}) => (
    <AppBar title={'WebPurple' + (user ? ` | ${getUserName(user)}` : '')}
            iconElementLeft={<IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu/>}</IconButton>}
            iconElementRight={user ? <AppAvatar user={user}/> : <LoginComponent />}/>
);

const AppHeaderContainer = connect(
    state => Object.assign({}, state.header, {leftNavOpen: state.leftNav.leftNavOpen}),
    (dispatch:Redux.Dispatch) => {
        return {
            onToggleLeftNav: () => dispatch(toggleLeftNav())
        }
    }
)(AppHeaderComponent);

export default AppHeaderContainer;