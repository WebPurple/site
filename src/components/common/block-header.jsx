import React from 'react';
import styled, { withTheme } from 'styled-components';

import { media } from '../../utils/css-utils';
import Separator from './separator';

const Header = styled.h2`
    font-family: 'Rubik', sans-serif;
    font-size: 2.6rem;
    ${media.tablet`font-size: 4.8rem;`}
    font-weight: bold;
    color: ${({ theme }) => theme.lipstick};
    text-align: center;
    vertical-align: middle;
    ${media.desktop`white-space: nowrap;`}
    padding: 0 3rem;
    ${media.tablet`padding: 0 4rem;`}
    margin: 0;
`;

export default withTheme(({ theme, children }) => (
    <Separator color={theme.lipstick}>
        <Header>{children}</Header>
    </Separator>
));
