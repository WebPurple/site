import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { media } from '../utils/css-utils';

import ArrowButton from '../components/arrow-button/arrow-button.jsx';
import WebpurpleLogo from '../components/webpurple-logo/webpurple-logo';


import { MenuIcon } from '../components/icons/header';

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${media.phone`margin: 3em 8em`};
    margin: 1em 0em;
`;

const MenuButton = styled(MenuIcon)`
    display: flex;
    margin: 0em 1em;
    ${media.phone`display: none;`};

`;

const Menu = styled.div`
    display: none;
    ${media.phone`display: flex;`};
    align-items: center;
    flex-grow: 2;
`;

const NavigationBar = styled.ul`
    display: flex;
    margin: 0;
    flex-grow: 2;
    align-items: center;
    flex-direction: row;

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

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 1.6em;
    font-weight: 500;
    color: ${props => props.theme.warmGrey};
`;

export default () => (
    <Header>
        <WebpurpleLogo />
        <MenuButton />
        <Menu>
            <NavigationBar>
                <MenuItem><NavigationLink to="/home">home</NavigationLink></MenuItem>
                <MenuItem><NavigationLink to="/events">events</NavigationLink></MenuItem>
                <MenuItem><NavigationLink to="/speakers">speakers</NavigationLink></MenuItem>
                <MenuItem><NavigationLink to="/feed">feed</NavigationLink></MenuItem>
            </NavigationBar>
            <ArrowButton>sign in</ArrowButton>
        </Menu>
    </Header>
);
