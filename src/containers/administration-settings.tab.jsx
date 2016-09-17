import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { SelectField } from 'redux-form-material-ui'; // eslint-disable-line import/no-unresolved

import { fetchAllUsers, fetchRoles, addRole, removeRole } from '../actions/user.actions';

const styles = {
    newUserHeader: {
        color: 'rgba(0, 0, 0, 0.541176)',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '48px',
        margin: 0,
    },
    newUser: {
        maxWidth: 400,
        border: '1px solid rgb(217, 217, 217)',
        margin: 24,
        padding: 16,
        boxSizing: 'border-box',
    },
    userList: {
        maxWidth: 400,
        border: '1px solid rgb(217, 217, 217)',
        margin: 24,
    },
};

class AdministrationSettingsTab extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchAllUsers());
        this.props.dispatch(fetchRoles());
    }

    render() {
        const {
            user: selectedUser,
            roles,
            invalid,
            handleSubmit,
            onAddRole,
            onRemoveRole,
        } = this.props;
        const users = this.props.users || [];
        const usersWithRoles = users.filter(user => user.roles.length > 0);

        const filteredUsers = roles
            ? users.filter(user => user.roles.length !== roles.length) // we don't need people with all roles
            : users;

        const filteredRoles = selectedUser && roles
            ? roles.filter(role => !~selectedUser.roles.indexOf(role))
            : roles;

        return (
            <div>
                <form style={styles.newUser}>
                    <h3 style={styles.newUserHeader}>Add new user</h3>
                    <Field
                        component={SelectField}
                        name="user"
                        hintText="Select user"
                        floatingLabelText="User"
                        disabled={!filteredUsers.length}>
                        { filteredUsers.map(user => (
                            <MenuItem key={user._id} value={user} primaryText={user.displayName} />
                        )) }
                    </Field>
                    <br />
                    <Field
                        component={SelectField}
                        name="userRole"
                        hintText="Select role"
                        floatingLabelText="User role"
                        disabled={!(filteredRoles && filteredRoles.length)}>
                        { filteredRoles && filteredRoles.map(role => (
                            <MenuItem key={role} value={role} primaryText={role} />
                        )) }
                    </Field>
                    <br />
                    <FlatButton label="Submit" disabled={invalid} onTouchTap={handleSubmit(onAddRole)} />
                </form>
                <List style={styles.userList}>
                    <Subheader>Users</Subheader>
                    {
                        usersWithRoles.map(user => (
                            <ListItem
                                key={user._id}
                                primaryText={user.displayName}
                                rightAvatar={(
                                    <span style={{ display: 'flex' }}>
                                        {
                                            user.roles.map(role => (
                                                <Chip
                                                    key={role}
                                                    onRequestDelete={() => onRemoveRole(user, role)}
                                                    style={{ marginLeft: 5 }}>
                                                    {role}
                                                </Chip>
                                            ))
                                        }
                                    </span>
                                )} />
                        ))
                    }
                </List>
            </div>
        );
    }
}

const validate = fields => {
    const errors = {};
    const requiredFields = ['userRole', 'user'];

    requiredFields.forEach(fieldName => {
        if (!fields[fieldName]) {
            errors[fieldName] = 'Required';
        }
    });

    return errors;
};

export const FORM_ID = 'settings.administration';

const AdministrationSettingsTabForm = reduxForm({
    form: FORM_ID,
    validate,
})(AdministrationSettingsTab);

const formSelector = formValueSelector(FORM_ID);

export default connect(
    state => ({
        users: state.adminTab.users,
        roles: state.user.allRoles,
        user: formSelector(state, 'user'),
    }),
    dispatch => bindActionCreators({
        onAddRole: addRole,
        onRemoveRole: removeRole,
    }, dispatch)
)(AdministrationSettingsTabForm);
