import * as React from 'react';
import { mapProps, withState, compose } from 'recompose';
import styled from 'styled-components';

import ArrowButton from '../arrow-button/arrow-button';
import Popup from '../common/popup';
import LogoIcon from '../icons/webpurple-logo-icon';

import LoginForm from './forms/login-form';
import RegisterForm from './forms/register-form';

const LoginHeader = styled.header`
    text-align: center;
`;

const LoginContainer = styled.div`
    align-items: center;
    display: flex;
`;

// const LoginFooter = styled.footer`
//     align-items: center;
//     display: flex;
//     justify-content: space-around;
//     margin-top: 1.5em;
// `;

const Title = styled.h2`
    align-items: center;
    color: #e62270;
    display: flex;
    font: bold 2.6em Rubik;
    justify-content: center;
    margin-bottom: .615em;
    margin: 0;
    text-transform: uppercase ;
    
    & > svg {
        flex-shrink: 0;
        margin-right: 2rem;
    }
`;

const Subtitle = styled.h3`
    color: #545454;
    font: 1.8em Oxygen;
    margin: 0;
`;

const LoginPopup = ({ isDialogOpened, showDialog, hideDialog, isRegistration, showLogin, showRegistration }) => (
    <LoginContainer>
        <ArrowButton className="e2e-sing-in-button" onClick={showDialog}>Sign In</ArrowButton>
        <Popup
            isOpen={isDialogOpened}
            contentLabel="Login"
            onRequestClose={hideDialog}
            width={400}>
            <LoginHeader className="e2e-sing-in-dialog">
                <Title><LogoIcon /> WebPurple</Title>
                <Subtitle>
                    { isRegistration ? 'Create new account' : 'Login to your account' }
                </Subtitle>
            </LoginHeader>
            {
                isRegistration ?
                    <RegisterForm showLoginForm={showLogin} /> :
                    <LoginForm showRegisterForm={showRegistration} />
            }
            {/*
            <LoginFooter>
                <Link>Forgot password?</Link>
                <Link>Need support?</Link>
            </LoginFooter>
            */}
        </Popup>
    </LoginContainer>
);

export default compose(
    withState('isDialogOpened', 'toggleDialog', false),
    withState('isRegistration', 'toggleRegistrationShow', false),
    mapProps(({ isDialogOpened, toggleDialog, isRegistration, toggleRegistrationShow }) => ({
        isDialogOpened,
        showDialog: () => toggleDialog(true),
        hideDialog: () => {
            toggleDialog(false);
            toggleRegistrationShow(false);
        },
        isRegistration,
        showRegistration: () => toggleRegistrationShow(true),
        showLogin: () => toggleRegistrationShow(false),
    })),
)(LoginPopup);
