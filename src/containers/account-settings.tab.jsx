import * as React from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/Card/Card';
import TextField from 'material-ui/TextField';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import { changeUserName, saveUser } from '../actions/user.actions';

const AccountSettingsTab = ({ account, isFetching, onUserNameChange, onUserSave }) => (
    <Card>
        {
            account ? (
                <CardText>
                    <TextField
                        floatingLabelText="Username"
                        disabled={isFetching}
                        value={account.displayName}
                        onChange={e => onUserNameChange(e.target.value)} />
                    <br />
                    <TextField
                        floatingLabelText="Email"
                        disabled={true || isFetching}
                        value={account.email} />
                </CardText>
            )
            : <CircularProgress />
        }
        <CardActions>
            <FlatButton label="Save" disabled={isFetching} onTouchTap={() => onUserSave(account)} />
        </CardActions>
    </Card>
);

const AccountSettingsTabContainer = connect(
    state => state.user,
    dispatch => ({
        onUserNameChange: (newName) => dispatch(changeUserName(newName)),
        onUserSave: user => dispatch(saveUser(user)),
    })
)(AccountSettingsTab);

export default AccountSettingsTabContainer;
