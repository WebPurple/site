import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { renderRoutes } from 'react-router-config';

import Header from '../header';
import { media } from '../../utils/css-utils';

import LoginPopup from '../../components/login/login-popup';
import FooterComponent from '../../components/footer';

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    width: 100%;
    ${media.desktop`width: 1280px;`}
    ${media.hd`width: 1440px;`}
`;

const Footer = styled.footer`
    padding: 40px;
    ${media.tablet`padding: 40px 175px;`}
    left: 0;
    bottom: 0;
    background-color: ${props => props.theme.grape};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
    color: white;
    font-family: 'Rubik', sans-serif;
`;

const theme = {
    grape: '#432867',
    warmGrey: '#a1a1a1',
    greyishBrown: '#545454',
    lipstick: '#e62270',
    vividPurple: '#9012fe',
    vividPurpleTwo: '#9013fe',
    cerise: '#ee2a7b',
    warmPurple: '#662d91',
    rouge: '#b21d3d',
};

const AppContainer = ({ route }) => (
    <ThemeProvider theme={theme}>
        <Container>
            <Header />
            <main>
                {renderRoutes(route.routes)}
            </main>
            <FooterComponent />
        </Container>
    </ThemeProvider>
);

AppContainer.propTypes = {
    route: React.PropTypes.object.isRequired,
};

export default AppContainer;
