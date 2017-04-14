import React from 'react';
import styled, { withTheme } from 'styled-components';

const MainText = styled.h1`
    font-family: Rubik;
    font-size: 7.8rem;
    font-weight: 500;
    line-height: 1;
    color: ${props => props.theme.lipstick};
    text-align: center;
`;

const PageNotFound = () => (
    <MainText>Page not found</MainText>
);

export default withTheme(PageNotFound);
