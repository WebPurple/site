import * as React from 'react';
import {connect} from "react-redux";

import * as Card from "material-ui/lib/card/card";
import * as CardHeader from "material-ui/lib/card/card-header";
import * as TextField from "material-ui/lib/text-field";
import * as CardText from "material-ui/lib/card/card-text";
import * as CardActions from "material-ui/lib/card/card-actions";
import * as FlatButton from "material-ui/lib/flat-button";
import * as CircularProgress from "material-ui/lib/circular-progress";

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