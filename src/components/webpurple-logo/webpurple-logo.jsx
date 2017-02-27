import React from 'react';
import styled, { withTheme } from 'styled-components';

import { WebpurpleIcon } from '../icons/header';

const Logo = styled.div`
    display: flex;
    align-items: center;

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

export default withTheme(({ theme }) => (
        <Logo>
          <StyledWebpurpleIcon />
          <Title>Webpurple</Title>
        </Logo>
));
