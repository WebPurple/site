import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { renderRoutes } from 'react-router-config';

import { media } from '../../utils/css-utils';

import LoginPopup from '../../components/login/login-popup';
import WebpurpleLogoIcon from '../../components/icons/webpurple-logo-icon';

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
    width: 100%;
    ${media.desktop`width: 1280px;`}
    ${media.hd`width: 1440px;`}
`;

const Header = styled.header`
    display: flex;
    margin: 0 50px;
    
    & :last-child {
        margin-left: auto;
    }
    
    ${media.hd`margin: 0 175px;`}
`;

const Logo = styled.h1`
    text-transform: uppercase;
    font-family: 'Rubik', sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
`;

const NavigationBar = styled.ul`
    list-style: none;
    display: none;
    ${media.tablet`display: flex;`}
    margin-top: 2rem;
`;

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    font-family: 'Rubik', sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: ${props => props.theme.warmGrey};
    
    padding: 10px;
    box-sizing: border-box;
    transition: border-color 1s ease-out;
    border-bottom: solid 3px transparent;
    
    &:hover, &.active {
        border-bottom-color: ${props => props.theme.lipstick};
    }
`;

const Footer = styled.footer`
    bottom: 0;
    background-color: ${props => props.theme.grape};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
    padding: 3rem 2rem 3.5rem;
    ${media.tablet`
        display: flex;
        padding: 4rem 2rem 3rem;
        align-items: center;
        justify-content: space-between;
    `}
    ${media.desktop`padding: 4rem 10rem 3rem;`}
`;

const FooterElementsStyle = styled.p`
    margin: 0;
    color: #fff;
    font-family: 'Oxygen', sans-serif;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    ${media.phone`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
    `}
    ${media.tablet`font-size: 1.8rem;`}
`;

const BlockElem = styled.p`
    margin: 1rem 0;
    text-align: center;
    ${media.phone`text-align: left;`}
`;

const LogoContainer = styled(BlockElem)`
    ${media.phone`padding-right: 0.8rem;`}
    
`;

const Copyrights = styled(FooterElementsStyle)`
    opacity: 0.6;
    ${media.tablet`margin-right: auto;`}
`;

const Contacts = styled(FooterElementsStyle)`
    ${media.tablet`margin-left: auto;`}
`;

const MailInfo = styled.a`
    color: ${props => props.theme.lipstick};
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
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
            <Header>
                <Logo>Webpurple</Logo>
                <NavigationBar>
                    <li><NavigationLink to="/home" activeClassName="active">Home</NavigationLink></li>
                    <li><NavigationLink to="/events" activeClassName="active">Events</NavigationLink></li>
                    <li><NavigationLink to="/speakers">Speakers</NavigationLink></li>
                    <li><NavigationLink to="#feed">Feed</NavigationLink></li>
                </NavigationBar>
                <LoginPopup />
            </Header>
            <main>
                {renderRoutes(route.routes)}
            </main>
            <Footer>
                <Copyrights>
                    <LogoContainer>
                        <WebpurpleLogoIcon isGray />
                    </LogoContainer><BlockElem>&#169; 2013 - {new Date().getFullYear()} Webpurple.</BlockElem><BlockElem>All rights reserved.</BlockElem>
                </Copyrights>
                <Contacts>Contact us <MailInfo href="mailto:info@webpurle.com">info@webpurle.com</MailInfo></Contacts>
            </Footer>
        </Container>
    </ThemeProvider>
);

AppContainer.propTypes = {
    route: React.PropTypes.object.isRequired,
};

export default AppContainer;
