import * as React from 'react';

import {connect} from 'react-redux';

import * as AppBar from 'material-ui/lib/app-bar';
import * as Avatar from 'material-ui/lib/avatar';
import * as FlatButton from 'material-ui/lib/flat-button';

const AppHeaderComponent = ({user}) => (
    <AppBar title='WebPurple'
            showMenuIconButton={false}
            iconElementRight={user ? <Avatar src={user.vkPhotoUrl}/>: <FlatButton label='Login' linkButton={true} href='auth/vk'/>}/>
);

const AppHeaderContainer = connect(state => state.header)(AppHeaderComponent);

export default AppHeaderContainer;