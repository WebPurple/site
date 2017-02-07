import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

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
    margin: 0 100px;
    padding: 40px 0;
    ${media.hd`margin: 0 120px;`}
`;

const Logo = styled.div`
    margin: 0 20px;
    width: 35px;
    height: 35px;
    background: url(logo.svg) no-repeat;
`;

// link???

const Title = styled.h1`
    margin: 0;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
`;

const NavigationBar = styled.ul`
    margin: 0;
    flex-grow: 2;
`;

// ToDo: animations 

const MenuItem = styled.li`
    list-style: none;
    display: inline-block;
    margin: 5px 20px;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    transition: border-color 1s ease-out;
    border-bottom: solid 3px transparent;
    
    &:hover {
        border-bottom-color: ${props => props.theme.lipstick};
    }
`;

const NavigationLink = styled.a`
    text-decoration: none;
    font-family: Rubik, sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: ${props => props.theme.warmGrey};
`;

//ToDo: logged/unlogged;
// should be link
// arrow shouldn't be image

const SignStatus = styled.div`
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-size: 26px;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    background: url(arrow-right.svg) no-repeat;
    background-position:100% 15%;
    padding: 0 35px 0 0; 
`;

const Footer = styled.footer`
    padding: 40px;
    ${media.tablet`padding: 40px 175px;`}
    left: 0;
    bottom: 0;
    background-color: ${props => props.theme.grape};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
    color: white;
    font-family: Rubik, sans-serif;
`;

const theme = {
    grape: '#432867',
    warmGrey: '#a1a1a1',
    lipstick: '#e62270',
    vividPurple: '#9012fe',
};

const AppContainer = ({ children }) => (
    <ThemeProvider theme={theme}>
        <Container>
            <Header>
                <Logo />
                <Title>Webpurple</Title>
                <NavigationBar>
                    <MenuItem><NavigationLink href="#home">Home</NavigationLink></MenuItem>
                    <MenuItem><NavigationLink href="#events">Events</NavigationLink></MenuItem>
                    <MenuItem><NavigationLink href="#speakers">Speakers</NavigationLink></MenuItem>
                    <MenuItem><NavigationLink href="#feed">Feed</NavigationLink></MenuItem>
                </NavigationBar>
                <SignStatus>/ sign in </SignStatus>
            </Header>
            <main>
                {children}
            </main>
            <Footer>Footer is supposed to be here</Footer>
        </Container>
    </ThemeProvider>
);

export default AppContainer;
