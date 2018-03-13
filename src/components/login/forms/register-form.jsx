import * as React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

import ArrowButton from './../../arrow-button/arrow-button';
import Input from './../../common/input';
import EmailIcon from './../../icons/email-icon';
import PadlockIcon from './../../icons/padlock-icon';

import Validators from './../../../utils/validators';

const FormFooter = styled.footer`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const Link = styled.button`
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
    font: 1.6em/1.5 Oxygen;

    &:hover {
        text-decoration: underline;
    }
`;

const ErrorMessage = styled.div`
    font-family: Oxygen;
    font-size: 1rem;
    color: red;
`;

// eslint-disable-next-line react/prop-types
const renderInput = ({ meta: { touched, error, warning }, input, ...props }) => (
    <div>
        <Input {...props} {...input} />
        { touched && error && <ErrorMessage>{error}</ErrorMessage> }
        { touched && warning && <ErrorMessage>{warning}</ErrorMessage> }
    </div>
);

const preventDefault = action => event => {
    event.preventDefault();
    action();
};

// eslint-disable-next-line arrow-body-style
const equalsValidator = (fieldName, message = "Passwords don't match") => (value, values) => {
    return values[fieldName] === value ? undefined : message;
};

const RegisterForm = ({ onShowLoginForm, handleSubmit, onSubmit }) => (
    <form onSubmit={handleSubmit(({ email, password }) => onSubmit({ email, password }))}>
        <Field
            name="email"
            type="email"
            style={{ margin: '1.6rem 0' }}
            leftIcon={<EmailIcon />}
            placeholder="Email..."
            validate={[Validators.required, Validators.email]}
            component={renderInput} />
        <Field
            name="password"
            type="password"
            style={{ margin: '1.6rem 0' }}
            leftIcon={<PadlockIcon />}
            placeholder="Password..."
            validate={[Validators.required, Validators.minLength(6)]}
            warn={[Validators.maxLength(72)]}
            component={renderInput} />
        <Field
            name="repassword"
            type="password"
            style={{ margin: '1.6rem 0' }}
            leftIcon={<PadlockIcon />}
            placeholder="Retype Password..."
            validate={equalsValidator('password')}
            component={renderInput} />
        <FormFooter>
            <Link onClick={preventDefault(onShowLoginForm)}>Sign in</Link>
            <ArrowButton onClick={this.requestCreateUser}>Create</ArrowButton>
        </FormFooter>
    </form>
);

RegisterForm.propTypes = {
    onShowLoginForm: React.PropTypes.func,
    onSubmit: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func,
};

export default reduxForm({ form: 'register' })(RegisterForm);
