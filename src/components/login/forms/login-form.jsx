import * as React from 'react';
import styled from 'styled-components';
import Color from 'color';
import { Field, reduxForm } from 'redux-form';

import {
    VkWipIcon,
    FacebookIcon,
    // GooglePlusIcon,
} from './../../icons/social';
import EmailIcon from './../../icons/email-icon';
import PadlockIcon from './../../icons/padlock-icon';

import ArrowButton from './../../arrow-button/arrow-button';
import Separator from './../../common/separator';
import Input from './../../common/input';

const FormFooter = styled.footer`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const SocialButton = styled.a`
    background-color: ${props => props.bgColor};
    border-radius: 0.111em;
    border: none;
    color: white;
    display: flex;
    font: 1.8em Oxygen;
    margin: 1.6rem 0;
    outline: none;
    padding-left: 2em;
    padding: 1.167em;
    position: relative;
    transition: all .3s;
    text-decoration: none;
    
    & > svg {
        position: absolute;
    }
    
    &:hover {
        background-color: ${props => props.bgColorHover};
    }
`;

const SocialButtonText = styled.span`
    flex-basis: 100%;
    margin-left: 2em;
    text-align: center;
`;

const PopupLinkButton = styled.button`
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
    font: 1.6em/1.5 Oxygen;

    &:hover {
        text-decoration: underline;
    }
`;

const SeparatorText = styled.span`
    color: #545454;
    font: 1.8em Oxygen;
    margin: 0 1em;
    text-transform: lowercase;
`;

const fbColor = new Color('#3b5998');
const fbColorHover = fbColor.darken(0.1).string();
const vkColor = new Color('#45668e');
const vkColorHover = vkColor.darken(0.1).string();
// const gpColor = new Color('#f34a38');
// const gpColorHover = gpColor.darken(0.1).string();

const validators = {
    email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined,
    maxLength: max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
    minLength: min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined,
    required: value => value ? undefined : 'Required',
};

// eslint-disable-next-line react/prop-types
const renderInput = ({ meta, input, ...props }) => <Input {...props} {...input} />;

const preventDefault = action => event => {
    event.preventDefault();
    action();
};

const LoginForm = ({ onShowRegisterForm, handleSubmit, onSubmit }) => (
    <div>
        <SocialButton bgColor={fbColor.string()} bgColorHover={fbColorHover} href="/auth/fb">
            <FacebookIcon />
            <SocialButtonText>Login with Facebook</SocialButtonText>
        </SocialButton>
        <SocialButton bgColor={vkColor.string()} bgColorHover={vkColorHover} href="/auth/vk">
            <VkWipIcon />
            <SocialButtonText>Login with VK</SocialButtonText>
        </SocialButton>

        {/*
        <SocialButton bgColor={gpColor.string()} bgColorHover={gpColorHover}>
            <GooglePlusIcon />
            <SocialButtonText>Login with Google</SocialButtonText>
        </SocialButton>
        */}

        <Separator height="2" color="#cdcdcd" style={{ margin: '2.4rem 0' }} >
            <SeparatorText>Or</SeparatorText>
        </Separator>

        <form onSubmit={handleSubmit(event => onSubmit(event))}>
            <Field
                name="email"
                type="email"
                style={{ margin: '1.6rem 0' }}
                leftIcon={<EmailIcon />}
                placeholder="Email..."
                validate={[validators.required, validators.email]}
                component={renderInput} />
            <Field
                name="password"
                type="password"
                style={{ margin: '1.6rem 0' }}
                leftIcon={<PadlockIcon />}
                placeholder="Password..."
                validate={[validators.required, validators.minLength(6)]}
                warn={[validators.maxLength(72)]}
                component={renderInput} />
            <FormFooter>
                <PopupLinkButton onClick={preventDefault(onShowRegisterForm)}>Create account</PopupLinkButton>
                <ArrowButton type="submit">Login</ArrowButton>
            </FormFooter>
        </form>
    </div>
);

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onShowRegisterForm: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
};

export default reduxForm({ form: 'login' })(LoginForm);
