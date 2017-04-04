import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { WebpurpleIcon } from '../icons/header';

const Logo = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const Title = styled.h1`
    font-size: 2.6em;
    margin: 0;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
`;

const StyledWebpurpleIcon = styled(WebpurpleIcon)`
    margin: 0 2em;
    width: 3.5em;
    height: 3.5em;
`;

const WebpurpleLogo = () => (
    <Logo to="/home">
        <StyledWebpurpleIcon />
        <Title>Webpurple</Title>
    </Logo>
);

export default WebpurpleLogo;
