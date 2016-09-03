import * as React from 'react';

import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';

const UserAvatar = ({ user, onTouchTap, style }) => (
    user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} style={style} onTouchTap={onTouchTap} />
        : <Avatar icon={<SocialPerson />} style={style} onTouchTap={onTouchTap} />
);

export default UserAvatar;
