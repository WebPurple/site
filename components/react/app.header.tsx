import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import * as AppBar from 'material-ui/lib/app-bar';
import * as Avatar from 'material-ui/lib/avatar';
import * as SocialPerson from 'material-ui/lib/svg-icons/social/person';
import * as IconButton from 'material-ui/lib/icon-button';
import * as Menu from 'material-ui/lib/svg-icons/navigation/menu';
import * as NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import * as CircularProgress from 'material-ui/lib/circular-progress';

import LoginComponent from './login.component';
import {toggleLeftNav} from '../actions/left-nav.actions';
import {IUser} from '../vo/index';

const AppHeaderComponent = ({user, onToggleLeftNav, leftNavOpen, onAvatarClick}) => (
    <AppBar style={{position: 'fixed'}} title={renderTitle(user)}
            iconElementLeft={<LeftIcon leftNavOpen={leftNavOpen} onToggleLeftNav={onToggleLeftNav}/>}
            iconElementRight={<RightMenu user={user.account} isFetching={user.isFetching} onAvatarClick={onAvatarClick}/>}/>
);

function renderTitle(user: {account: IUser}) {
    return 'WebPurple' + (user.account && user.account._id ? ` | ${user.account.displayName}` : '');
}

const LeftIcon = ({leftNavOpen, onToggleLeftNav}) => (
    <IconButton onTouchTap={onToggleLeftNav}>{leftNavOpen ? <NavigationClose /> : <Menu/>}</IconButton>
);

const RightMenu = ({user, isFetching, onAvatarClick}) => (
    user && user._id ? <AppAvatar user={user} onTouchTap={onAvatarClick}/>
        : isFetching ? <CircularProgress color="#fff" size={0.5}/>
        : <LoginComponent />
);

const AppAvatar = ({user, onTouchTap}) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} onTouchTap={onTouchTap}/>
        : <Avatar icon={<SocialPerson/>} onTouchTap={onTouchTap}/>
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