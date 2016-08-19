import * as React from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

import UserAvatar from './../user-avatar.component';

import { fetchAllUsers } from '../../actions/user.actions';

class UsersPage extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchAllUsers());
    }

    render() {
        const { users } = this.props;
        return (
            <Card>
                <List subheader="Registered users">
                    {users
                        ? users.map(user => <ListItem
                            key={user._id}
                            leftIcon={<UserAvatar user={user} />}
                            primaryText={user.displayName} />)
                        : <CircularProgress />}
                </List>
            </Card>
        );
    }
}

const UsersPageContainer = connect(state => state.usersPage)(UsersPage);

export default UsersPageContainer;
