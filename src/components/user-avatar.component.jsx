import * as React from 'react';

import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import SocialPerson from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const UserAvatar = ({ user, style }) => (
    <IconMenu
        style={{ marginRight: '2px' }}
        iconButtonElement={
            <IconButton style={{ padding: '0px' }}>{
              user.vkPhotoUrl ? <Avatar src={user.vkPhotoUrl} style={style} /> :
              <Avatar icon={<SocialPerson />} style={style} />}
            </IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'middle', vertical: 'top' }}>
        <MenuItem primaryText="Settings" containerElement={<Link to="/settings" />} />
        <MenuItem primaryText="Sign out" href="/logout" />
    </IconMenu>
);

UserAvatar.propTypes = {
    user: React.PropTypes.object,
    style: React.PropTypes.object,
};

export default UserAvatar;
