import * as React from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

import UserAvatar from './../user-avatar.component';

const UsersPage = ({ users }) => (
    <Card>
        <List subheader="Registered users">
            {users ? users.map(user => <ListItem key={user._id} leftIcon={<UserAvatar user={user} />} primaryText={user.displayName} />)
                : <CircularProgress />}
        </List>
    </Card>
);

const UsersPageContainer = connect(state => state.usersPage)(UsersPage);

export default UsersPageContainer;
