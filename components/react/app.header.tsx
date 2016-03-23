import * as React from "react";

import AppBar from "material-ui/lib/app-bar";
import Avatar from "material-ui/lib/avatar";
import FlatButton from "material-ui/lib/flat-button";


const AppHeader = ({user}) => (
    <AppBar title='WebPurple'
            showMenuIconButton={false}
            iconElementRight={user ? <Avatar src={user.vkPhotoUrl}/>: <FlatButton label='Login' linkButton={true} href="auth/vk"/>}/>
);

export default AppHeader;