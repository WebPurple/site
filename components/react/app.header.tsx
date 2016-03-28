import * as React from 'react';

import {connect} from 'react-redux';

import * as AppBar from 'material-ui/lib/app-bar';
import * as Avatar from 'material-ui/lib/avatar';
import * as IconButton from "material-ui/lib/icon-button";
import * as Menu from "material-ui/lib/svg-icons/navigation/menu";
import * as NavigationClose from "material-ui/lib/svg-icons/navigation/close";

import LoginComponent from './login.component';
import {toggleLeftNav} from "../actions/left-nav.actions";

const AppHeaderComponent = ({user, onToggleLeftNav, leftNavOpen}) => (
    <AppBar title={`WebPurple${user && ` | ${user.vkDisplayName}` || ''}`}
            iconElementLeft={<IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu/>}</IconButton>}
            iconElementRight={user ? <Avatar src={user.vkPhotoUrl}/>: <LoginComponent />}/>
);

const AppHeaderContainer = connect(
    state => Object.assign({}, state.header, {leftNavOpen: state.leftNav.leftNavOpen}),
    (dispatch: Redux.Dispatch) => {
        return {
            onToggleLeftNav: () => dispatch(toggleLeftNav())
        }
    }
)(AppHeaderComponent);

export default AppHeaderContainer;