import * as React from 'react';
import {connect} from 'react-redux';

import * as Card from 'material-ui/lib/card/card';
import * as List from 'material-ui/lib/lists/list';
import * as ListItem from 'material-ui/lib/lists/list-item';
import * as CircularProgress from "material-ui/lib/circular-progress";

import {IUser} from '../../vo/index';
import UserAvatar from './../user-avatar.component';

const UsersPage = ({users}: {users: IUser[]}) => (
    <Card>
        <List subheader="Registered users">
            {users ? users.map(user => <ListItem key={user._id} leftIcon={<UserAvatar user={user}/>} primaryText={user.displayName}/>)
                : <CircularProgress/>}
        </List>
    </Card>
);

const UsersPageContainer = connect(state => state.usersPage)(UsersPage);

export default UsersPageContainer;