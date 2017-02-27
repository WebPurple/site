import React from 'react';
import styled, { withTheme } from 'styled-components';
import { media } from '../utils/css-utils';
import { Link } from 'react-router';
import ArrowButton from '../components/arrow-button/arrow-button.jsx';
import WebpurpleLogo from '../components/webpurple-logo/webpurple-logo';


import { WebpurpleIcon } from '../components/icons/header';

const Header = styled.header`
    display: flex;
    margin: 3em 8em;
    align-items: center;
    ${media.hd`margin: 0 120px;`}
`;

const Logo = styled.div`
    margin: 0 2em;
    width: 3.5em;
    height: 3.5em;
`;

const Title = styled.h1`
    font-size: 2.6em;
    margin: 0;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
`;

const NavigationBar = styled.ul`
    display: flex;
    margin: 0;
    flex-grow: 2;
    align-items: center;
`;

// ToDo: animations

const MenuItem = styled.li`
    list-style: none;
    display: inline-flex;
    box-sizing: border-box;
    transition: border-color 1s ease-out;
    padding: 1.3em 0 1em 0;
    border-bottom: solid 0.3em transparent;
    margin: 0 2.5em 0 0;
    &:hover {
        border-bottom-color: ${props => props.theme.lipstick};
    }
`;

const NavigationLink = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 1.6em;
    font-weight: 500;
    color: ${props => props.theme.warmGrey};
`;

export default withTheme(({ theme }) => (
    <Header>
        <WebpurpleLogo />
        <NavigationBar>
            <MenuItem><NavigationLink to="#Home">home</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#events">events</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#speakers">speakers</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="#feed">feed</NavigationLink></MenuItem>
        </NavigationBar>
        <ArrowButton>sign in</ArrowButton> 
    </Header>
));
