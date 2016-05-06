import * as React from 'react';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var Avatar = require('material-ui/lib/avatar');
var SocialPerson = require('material-ui/lib/svg-icons/social/person');

const UserAvatar = ({user, onTouchTap, style}) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} style={style} onTouchTap={onTouchTap}/>
        : <Avatar icon={<SocialPerson/>} style={style} onTouchTap={onTouchTap}/>
);

export default UserAvatar;