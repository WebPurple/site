import React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';

const SubscriptionForm = styled.section`
    background-image: url(subscribtion-form-bg.jpg);
    background-size: cover;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    ${media.desktop`padding: 100px 20px;`}
`;

const Header = styled.h2`
    text-align: center;
    margin: 0;
    margin-bottom: 16px;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    color: #fff;
    line-height: 26px;
    font-size: 26px;
    ${media.tablet`
        line-height: 48px;
        font-size: 48px;
    `}
`;

const SubHeader = styled.p`
    text-align: center;
    margin: 0;
    margin-bottom: 40px;
    font-family: 'Oxygen', sans-serif;
    color: #fff;
    font-size: 14px;
    ${media.tablet`
        line-height: 24px;
        font-size: 24px;
    `}
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${media.tablet`
        width: auto;
        flex-direction: row;
    `}
`;

const Input = styled.input`
    font-family: 'Oxygen', sans-serif;
    font-size: 24px;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 30px;
    color: #ccc;
    margin-bottom: 25px;
    ${media.tablet`
        width: 350px;
        margin-right: 15px;
        margin-bottom: 0;
    `}
`;

const SubscribeButton = styled.button`
    border: solid 3px #fff;
    background: transparent;
    font-family: 'Rubik', sans-serif;
    text-transform: uppercase;
    font-size: 24px;
    padding: 20px 30px;
    font-weight: bold;
    color: #fff;
    transition: all 0.2s ease-in-out;
    
    &:hover,
    &:focus {
        background: #fff;
        color: ${props => props.theme.vividPurple};
    }
`;

export default function () {
    return (
        <SubscriptionForm>
            <Header>Be informed about the coolest meetups</Header>
            <SubHeader>Get Webpurples latest news straight to your inbox. Enter your email address below:</SubHeader>
            <FormWrapper>
                <Input type="text" placeholder="Enter your email" />
                <SubscribeButton>Subscribe</SubscribeButton>
            </FormWrapper>
        </SubscriptionForm>
    );
}
