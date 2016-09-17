import * as React from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import { TextField } from 'redux-form-material-ui'; // eslint-disable-line import/no-unresolved

import { saveUser } from '../actions/user.actions';

const AccountSettingsTab = ({ account, isFetching, handleSubmit, dispatch }) => (
    <Card>
        {
            account ? (
                <CardText>
                    <Field
                        name="username"
                        component={TextField}
                        floatingLabelText="Username"
                        disabled={isFetching} />
                    <br />
                </CardText>
            )
                : <CircularProgress />
        }
        <CardActions>
            <FlatButton
                label="Save"
                disabled={isFetching}
                onTouchTap={handleSubmit(({ username }) => dispatch(saveUser({ _id: account._id, displayName: username })))} />
        </CardActions>
    </Card>
);

export const FORM_ID = 'settings.account';

const AccountSettingsTabForm = reduxForm({
    form: FORM_ID,
})(AccountSettingsTab);

export default connect(({ user: { account, isFetching } }) => {
    let props = {
        account,
        isFetching,
    };
    if (account) { // initialValues can be set only one time
        props = {
            ...props,
            initialValues: {
                username: account.displayName,
            },
        };
    }
    return props;
})(AccountSettingsTabForm);
