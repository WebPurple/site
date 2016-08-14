import * as React from 'react';
import { connect } from 'react-redux';

import { changeUserName, saveUser } from '../../actions/user.actions';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const TextField = require('material-ui/lib/text-field');
const CardText = require('material-ui/lib/card/card-text');
const CardActions = require('material-ui/lib/card/card-actions');
const FlatButton = require('material-ui/lib/flat-button');
const CircularProgress = require('material-ui/lib/circular-progress');

const SettingsPage = ({ account, isFetching, onUserNameChange, onUserSave }) => (
    <Card>
        <CardHeader title="Settings" />
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

const SettingsPageContainer = connect(
    state => state.user,
    dispatch => ({
        onUserNameChange: (newName) => dispatch(changeUserName(newName)),
        onUserSave: user => dispatch(saveUser(user)),
    })
)(SettingsPage);

export default SettingsPageContainer;
