import * as React from 'react';

import * as Avatar from 'material-ui/lib/avatar';
import * as SocialPerson from 'material-ui/lib/svg-icons/social/person';

import {IUser} from '../vo/index';

const UserAvatar = ({user, onTouchTap, style}: {user: IUser, onTouchTap?: Function, style: any}) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} style={style} onTouchTap={onTouchTap}/>
        : <Avatar icon={<SocialPerson/>} style={style} onTouchTap={onTouchTap}/>
);

export default UserAvatar;