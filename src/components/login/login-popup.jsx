import * as React from 'react';
import { mapProps, withState, compose } from 'recompose';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArrowButton from '../arrow-button/arrow-button';
import Popup from '../common/popup';
import LogoIcon from '../icons/webpurple-logo-icon';

import LoginForm from './forms/login-form';
import RegisterForm from './forms/register-form';

import { loginUser, registerUser } from './../../reducers/user.reducer';

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

// eslint-disable-next-line no-shadow
const LoginPopup = ({ isDialogOpened, showDialog, hideDialog, isRegistration, showLogin, showRegistration, loginUser, registerUser }) => (
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
                    <RegisterForm showLoginForm={showLogin} onSubmit={registerUser} /> :
                    <LoginForm onShowRegisterForm={showRegistration} onSubmit={loginUser} />
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

LoginPopup.propTypes = {
    isDialogOpened: React.PropTypes.bool,
    isRegistration: React.PropTypes.bool,
    loginUser: React.PropTypes.func,
    registerUser: React.PropTypes.func,
    showDialog: React.PropTypes.func,
    hideDialog: React.PropTypes.func,
    showRegistration: React.PropTypes.func,
    showLogin: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loginUser,
    registerUser,
}, dispatch);

export default compose(
    withState('isDialogOpened', 'toggleDialog', false),
    withState('isRegistration', 'toggleRegistrationShow', false),
    connect(null, mapDispatchToProps),
    // eslint-disable-next-line no-shadow
    mapProps(({ isDialogOpened, toggleDialog, isRegistration, toggleRegistrationShow, loginUser, registerUser }) => ({
        loginUser,
        registerUser,
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
