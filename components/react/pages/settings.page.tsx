import * as React from 'react';
import {connect} from "react-redux";

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var Card = require("material-ui/lib/card/card");
var CardHeader = require("material-ui/lib/card/card-header");
var TextField = require("material-ui/lib/text-field");
var CardText = require("material-ui/lib/card/card-text");
var CardActions = require("material-ui/lib/card/card-actions");
var FlatButton = require("material-ui/lib/flat-button");
var CircularProgress = require("material-ui/lib/circular-progress");

import {IUser} from "../../vo/index";
import {changeUserName, saveUser} from "../../actions/user.actions";

const SettingsPage = ({account, isFetching, onUserNameChange, onUserSave}: {account: IUser, isFetching: boolean}) => (
    <Card>
        <CardHeader title="Settings"/>
        {
            account ? (
                <CardText>
                    <TextField floatingLabelText="Username"
                               disabled={isFetching}
                               value={account.displayName}
                               onChange={e => onUserNameChange(e.target.value)}/>
                    <br/>
                    <TextField floatingLabelText="Email"
                               disabled={true || isFetching}
                               value={account.email}/>
                </CardText>
            )
                : <CircularProgress/>
        }
        <CardActions>
            <FlatButton label="Save" disabled={isFetching} onTouchTap={() => onUserSave(account)}/>
        </CardActions>
    </Card>
);

const SettingsPageContainer = connect(
    state => state.user,
    (dispatch: Redux.Dispatch) => {
        return {
            onUserNameChange: (newName) => dispatch(changeUserName(newName)),
            onUserSave: user => dispatch(saveUser(user))
        }
    }
)(SettingsPage);

export default SettingsPageContainer;