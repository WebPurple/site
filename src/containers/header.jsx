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
    width: 100%;
    height:100%;
    align-items: left;
    flex-direction: row;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    margin: 1em 0em;
    ${media.desktop`
        display: flex;
        width: auto;
        height: auto;
        background-color: auto;
        flex-wrap: nowrap;
        flex-grow: 2;
        justify-content: flex-start;
    `};
`;

const MenuButton = styled(MenuIcon)`
    display: flex;
    margin: 0em 1em;
    ${media.desktop`display: none;`};
`;

const NavigationBar = styled.ul`
    ${media.desktop`
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
    transition: border-color 1s ease-out;
    padding: 1.3em 0 1em 0;
    border-bottom: solid 0.3em transparent;
    margin: 0 2.5em 0 4em;
    &:hover {
        border-bottom-color: ${props => props.theme.lipstick};
    }
    ${media.desktop`
        margin: 0 2.5em 0 0;
    `};
`;

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 1.6em;
    font-weight: 500;
    color: ${props => props.theme.warmGrey};
`;

const ArrowButtonStyled = styled(ArrowButton)`
    margin: 0 0 0 4em;
    ${media.desktop`
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
