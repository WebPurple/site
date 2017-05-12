import * as React from 'react';
import styled from 'styled-components';

import ArrowButton from './../../arrow-button/arrow-button';
import Input from './../../common/input';
import EmailIcon from './../../icons/email-icon';
import PadlockIcon from './../../icons/padlock-icon';

import validations from './../../../validations';

import { postJson } from './../../../utils/ajax';

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

export default class RegisterForm extends React.Component {
    static propTypes = {
        showLoginForm: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            repassword: null,
            errorMessages: [], // validation error messages from server
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.requestCreateUser = this.requestCreateUser.bind(this);
        this.onShowLoginForm = this.onShowLoginForm.bind(this);
    }

    onShowLoginForm(event) {
        event.preventDefault();
        this.props.showLoginForm();
    }

    getEmailFieldValidationMessages() {
        const messages = [];
        if (!this.state.email) {
            messages.push('Email must be filled');
        } else if (!validations.emailValidation(this.state.email)) {
            messages.push('Enter correct email address');
        }

        return messages;
    }

    getPasswordFieldValidationMessages() {
        const messages = [];
        if (!this.state.password) {
            messages.push('Password must be filled');
        } else {
            if (this.state.password.length < 6) {
                messages.push('Password length must be greater that 6 digits');
            }
            if (!validations.passwordValidation(this.state.password)) {
                messages.push('Password must begin with a letter or number');
            }
        }

        return messages;
    }

    getRepasswordFieldValidationMessages() {
        const messages = [];
        if (!this.state.password) {
            messages.push('Fill password again');
        } else if (this.state.password !== this.state.repassword) {
            messages.push('Passwords do not match');
        }

        return messages;
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    validateForm() {
        const errors = [
            ...this.getEmailFieldValidationMessages(),
            ...this.getPasswordFieldValidationMessages(),
            ...this.getRepasswordFieldValidationMessages(),
        ];
        return errors.length === 0;
    }

    requestCreateUser(event) {
        event.preventDefault();
        if (!this.validateForm()) {
            return; // early exit
        }
        postJson('/auth/register', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(() => this.props.showLoginForm());
    }

    render() {
        return (
            <form action="/auth/register" method="POST">
                <Input
                    name="email"
                    style={{ margin: '1.6rem 0' }}
                    type="email"
                    leftIcon={<EmailIcon />}
                    placeholder="Email..."
                    value={this.state.email || ''}
                    onChange={this.handleInputChange} />
                {this.state.email && this.getEmailFieldValidationMessages().map(message => <ErrorMessage>{message}</ErrorMessage>)}
                <Input
                    name="password"
                    style={{ margin: '1.6rem 0' }}
                    type="password"
                    leftIcon={<PadlockIcon />}
                    placeholder="Password..."
                    value={this.state.password || ''}
                    onChange={this.handleInputChange} />
                {this.state.password && this.getPasswordFieldValidationMessages().map(message => <ErrorMessage>{message}</ErrorMessage>)}
                <Input
                    name="repassword"
                    style={{ margin: '1.6rem 0' }}
                    type="password"
                    leftIcon={<PadlockIcon />}
                    placeholder="Retype Password..."
                    value={this.state.repassword || ''}
                    onChange={this.handleInputChange} />
                {this.state.password && this.getRepasswordFieldValidationMessages().map(message => <ErrorMessage>{message}</ErrorMessage>)}
                <FormFooter>
                    <Link onClick={this.onShowLoginForm}>Sign in</Link>
                    <ArrowButton onClick={this.requestCreateUser}>Create</ArrowButton>
                </FormFooter>
            </form>
        );
    }
}
