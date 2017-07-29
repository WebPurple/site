import * as React from 'react';
import { mapProps, withState, compose } from 'recompose';
import styled from 'styled-components';
import Color from 'color';

import {
    VkWipIcon,
    FacebookIcon,
    // GooglePlusIcon,
} from '../icons/social';
import LogoIcon from '../icons/webpurple-logo-icon';
// import EmailIcon from '../icons/email-icon';
// import PadlockIcon from '../icons/padlock-icon';

import Popup from '../common/popup';
import ArrowButton from '../arrow-button/arrow-button';
// import Separator from '../common/separator';
// import Input from '../common/input';

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

// const FormFooter = styled.footer`
//     align-items: center;
//     display: flex;
//     justify-content: space-between;
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

// const Link = styled.a`
//     color: #ccc;
//     cursor: pointer;
//     font: 1.6em/1.5 Oxygen;
//
//     &:hover {
//         text-decoration: underline;
//     }
// `;

// const SeparatorText = styled.span`
//     color: #545454;
//     font: 1.8em Oxygen;
//     margin: 0 1em;
//     text-transform: lowercase;
// `;

const fbColor = new Color('#3b5998');
const fbColorHover = fbColor.darken(0.1).string();
const vkColor = new Color('#45668e');
const vkColorHover = vkColor.darken(0.1).string();
// const gpColor = new Color('#f34a38');
// const gpColorHover = gpColor.darken(0.1).string();

const LoginPopup = ({ isDialogOpened, showDialog, hideDialog }) => (
    <LoginContainer>
        <ArrowButton className="e2e-sing-in-button" onClick={showDialog}>Sign In</ArrowButton>
        <Popup
            isOpen={isDialogOpened}
            contentLabel="Login"
            onRequestClose={hideDialog}
            width={400}>
            <LoginHeader className="e2e-sing-in-dialog">
                <Title><LogoIcon /> WebPurple</Title>
                <Subtitle>Login to your account</Subtitle>
            </LoginHeader>

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

                    <Separator
                        height="2"
                        color="#cdcdcd"
                        style={{ margin: '2.4rem 0' }} >
                        <SeparatorText>Or</SeparatorText>
                    </Separator>

                    <form>
                        <Input
                            style={{ margin: '1.6rem 0' }}
                            type="email"
                            leftIcon={<EmailIcon />}
                            placeholder="Email..." />
                        <Input
                            style={{ margin: '1.6rem 0' }}
                            type="password"
                            leftIcon={<PadlockIcon />}
                            placeholder="Password..." />
                        <FormFooter>
                            <Link>Create account</Link>
                            <ArrowButton>Login</ArrowButton>
                        </FormFooter>
                    </form>

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
    mapProps(({ isDialogOpened, toggleDialog }) => ({
        isDialogOpened,
        showDialog: () => toggleDialog(true),
        hideDialog: () => toggleDialog(false),
    })),
)(LoginPopup);
