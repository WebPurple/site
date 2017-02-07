import * as React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';

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
    ${media.hd`margin: 0 175px;`}
`;

const Logo = styled.h1`
    width: 162px;
    height: 31px;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #e62270;
`;

const NavigationBar = styled.ul`
    display: none;
    ${media.tablet`display: block;`}
`;

const MenuItem = styled.li`
    list-style: none;
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    transition: border-color 1s ease-out;
    border-bottom: solid 3px transparent;

    &:hover {
        border-bottom-color: #e62270;
    }
`;

const NavigationLink = styled.a`
    width: 52px;
    height: 16px;
    text-decoration: none;
    font-family: Rubik, sans-serif;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.89;
    letter-spacing: normal;
    text-align: center;
    color: #a1a1a1;
`;

const Footer = styled.footer`
    padding: 40px;
    ${media.tablet`padding: 40px 175px;`}
    left: 0;
    bottom: 0;
    background-color: #432867;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
    color: white;
    font-family: Rubik, sans-serif;
`;

const AppContainer = ({ children }) => (
    <Container>
        <Header>
            <Logo>Webpurple</Logo>
            <NavigationBar>
                <MenuItem><NavigationLink href="#home">Home</NavigationLink></MenuItem>
                <MenuItem><NavigationLink href="#events">Events</NavigationLink></MenuItem>
                <MenuItem><NavigationLink href="#speakers">Speakers</NavigationLink></MenuItem>
                <MenuItem><NavigationLink href="#feed">Feed</NavigationLink></MenuItem>
            </NavigationBar>
        </Header>
        <main>
            {children}
        </main>
        <Footer>Footer is supposed to be here</Footer>
    </Container>
);

export default AppContainer;
