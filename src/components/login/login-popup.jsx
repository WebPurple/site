import * as React from 'react';
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

export default class LoginPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialogOpened: false, isRegistration: false };

        this.onShowLoginForm = this.onShowLoginForm.bind(this);
        this.onShowRegisterForm = this.onShowRegisterForm.bind(this);
    }

    onShowLoginForm() {
        this.setState({ isRegistration: false });
    }

    onShowRegisterForm() {
        this.setState({ isRegistration: true });
    }

    render() {
        return (
            <LoginContainer>
                <ArrowButton onClick={() => this.setState({ dialogOpened: true })}>Sign In</ArrowButton>
                <Popup
                    isOpen={this.state.dialogOpened}
                    contentLabel="Login"
                    onRequestClose={() => this.setState({ dialogOpened: false, isRegistration: false })}
                    width={400}>
                    <LoginHeader>
                        <Title><LogoIcon /> WebPurple</Title>
                        <Subtitle>
                            { this.state.isRegistration ? 'Create new account' : 'Login to your account' }
                        </Subtitle>
                    </LoginHeader>
                    {
                        this.state.isRegistration ?
                            <RegisterForm showLoginForm={() => this.setState({ isRegistration: false })} /> :
                            <LoginForm showRegisterForm={() => this.setState({ isRegistration: true })} />
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
    }
}
