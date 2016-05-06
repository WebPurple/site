import * as React from 'react';
import {connect} from 'react-redux';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var Card = require('material-ui/lib/card/card');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var CircularProgress = require('material-ui/lib/circular-progress');

import UserAvatar from './../user-avatar.component';

const UsersPage = ({users}) => (
    <Card>
        <List subheader="Registered users">
            {users ? users.map(user => <ListItem key={user._id} leftIcon={<UserAvatar user={user}/>} primaryText={user.displayName}/>)
                : <CircularProgress/>}
        </List>
    </Card>
);

const UsersPageContainer = connect(state => state.usersPage)(UsersPage);

export default UsersPageContainer;