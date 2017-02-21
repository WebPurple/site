import React from 'react';
import styled, { withTheme } from 'styled-components';
import { media } from '../utils/css-utils';
import { Link } from 'react-router';


import {
    WebpurpleIcon
} from '../components/icons/header';

const Header = styled.header`
    display: flex;
    margin: 0 100px;
    padding: 40px 0;
    ${media.hd`margin: 0 120px;`}
`;

const Logo = styled.div`
    margin: 0 20px;
    width: 35px;
    height: 35px;
`;

// link???

const Title = styled.h1`
    margin: 0;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
`;

const NavigationBar = styled.ul`
    margin: 0;
    flex-grow: 2;
`;

// ToDo: animations

const MenuItem = styled.li`
    list-style: none;
    display: inline-block;
    margin: 5px 20px;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    transition: border-color 1s ease-out;
    border-bottom: solid 3px transparent;
    
    &:hover {
        border-bottom-color: ${props => props.theme.lipstick};
    }
`;

const NavigationLink = styled(Link)`
    text-decoration: none;
    font-family: Rubik, sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: ${props => props.theme.warmGrey};
`;

//ToDo: logged/unlogged;
// should be link
// arrow shouldn't be image

const SignStatus = styled.div`
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    background: url(arrow-right.svg) no-repeat;
    background-position:100% 15%;
    padding: 0 35px 0 0; 
`;

export default withTheme(({ theme }) => (
    <Header>
        <Logo>
          <WebpurpleIcon />
        </Logo>
        <Title>Webpurple</Title>
        <NavigationBar>
            <MenuItem><NavigationLink to="#Home">Home</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#events">Events</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#speakers">Speakers</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#feed">Feed</NavigationLink></MenuItem>
        </NavigationBar>
        <SignStatus>/ sign in </SignStatus>
    </Header>
));
