import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { media } from '../utils/css-utils';

import ArrowButton from '../components/arrow-button/arrow-button.jsx';
import WebpurpleLogo from '../components/webpurple-logo/webpurple-logo';


import { MenuIcon } from '../components/icons/header';

const Wrapper = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100vm;
    height:100vh;
    flex-direction: row;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    ${media.tablet`
        display: flex;
        width: auto;
        height: auto;
        background-color: auto;
        flex-wrap: nowrap;
        flex-grow: 2;
        justify-content: flex-start;
        margin: 3em 0;
    `};
`;

const MenuButton = styled(MenuIcon)`
    display: flex;
    margin: 0em 1em;
    ${media.tablet`display: none;`};
`;

const NavigationBar = styled.ul`
    ${media.tablet`
        margin: 0;
        flex-grow: 2;
        align-items: center;
        flex-direction: row;
        width: auto;
    `};
    display: flex;
    flex-direction: column;
    width: 100%;
`;

// ToDo: animations

const MenuItem = styled.li`
    list-style: none;
    display: inline-flex;
    box-sizing: border-box;
    padding: 1.3em 0 1em 0;
    margin: 0 2.5em 2em 4em;
    &:hover {
        border-bottom-color: ${props => props.theme.lipstick};
    }
    ${media.tablet`
        margin: 0 2.5em 0 0;
        transition: border-color 1s ease-out;
        border-bottom: solid 0.3em transparent;
    `};
`;

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 2.3em;
    font-weight: 500;
    color: ${props => props.theme.warmGrey};
    ${media.tablet`
        font-size: 1.6em;
    `};
`;

const ArrowButtonStyled = styled(ArrowButton)`
    margin: 0 0 0 4em;
    
    ${media.tablet`
        margin: auto;
    `};
`;

const Header = () => (
    <Wrapper>
        <WebpurpleLogo />
        <MenuButton />
        <NavigationBar>
            <MenuItem><NavigationLink to="/home">home</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="/events">events</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="/speakers">speakers</NavigationLink></MenuItem>
            <MenuItem><NavigationLink to="/feed">feed</NavigationLink></MenuItem>
        </NavigationBar>
        <ArrowButtonStyled>sign in</ArrowButtonStyled>
    </Wrapper>
);


export default Header;
