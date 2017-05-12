import * as React from 'react';
import styled from 'styled-components';
import Color from 'color';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

import { postJson } from './../../../utils/ajax';
import { fetchUser } from './../../../reducers/user.reducer';

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

class LoginForm extends React.Component {
    static propTypes = {
        showRegisterForm: React.PropTypes.func,
        fetchUser: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = { email: null, password: null };

        this.onShowRegisterForm = this.onShowRegisterForm.bind(this);
        this.onLoginRequest = this.onLoginRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onShowRegisterForm(event) {
        event.preventDefault();
        this.props.showRegisterForm();
    }

    onLoginRequest(event) {
        event.preventDefault();
        postJson('/auth/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(() => this.props.fetchUser());
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
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

                <Separator
                    height="2"
                    color="#cdcdcd"
                    style={{ margin: '2.4rem 0' }} >
                    <SeparatorText>Or</SeparatorText>
                </Separator>

                <form>
                    <Input
                        name="email"
                        onChange={this.handleInputChange}
                        style={{ margin: '1.6rem 0' }}
                        type="email"
                        leftIcon={<EmailIcon />}
                        placeholder="Email..." />
                    <Input
                        name="password"
                        onChange={this.handleInputChange}
                        style={{ margin: '1.6rem 0' }}
                        type="password"
                        leftIcon={<PadlockIcon />}
                        placeholder="Password..." />
                    <FormFooter>
                        <PopupLinkButton onClick={this.onShowRegisterForm}>Create account</PopupLinkButton>
                        <ArrowButton onClick={this.onLoginRequest}>Login</ArrowButton>
                    </FormFooter>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUser,
}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(LoginForm);
