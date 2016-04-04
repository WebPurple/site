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

const SettingsPage = (user: IUser) => (
    <Card style={{margin: 10}}>
        <CardHeader title="Settings"/>
        {
            user ? (
                <CardText>
                    <TextField floatingLabelText="Username" disabled={true} value={user.vkDisplayName || user.fbDisplayName}/>
                    <br/>
                    <TextField floatingLabelText="Email" disabled={true} value={user.email}/>
                </CardText>
            )
                : <CircularProgress/>
        }
        <CardActions>
            <FlatButton label="Save" disabled={true}/>
        </CardActions>
    </Card>
);

const SettingsPageContainer = connect(state => state.user)(SettingsPage);

export default SettingsPageContainer;