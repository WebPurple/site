import * as React from 'react'
import { NavLink } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { media } from '../utils/css-utils'

import WebpurpleLogoIcon from './icons/webpurple-logo-icon'

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
  `};
  ${media.desktop`padding: 4rem 10rem 3rem;`};
`

const FooterElementsStyle = styled.span`
  margin: 0;
  color: #fff;
  font-family: 'Oxygen', sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  flex-wrap: wrap;
  ${media.phone`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
  `};
  ${media.tablet`font-size: 1.8rem;`};
`

const BlockElem = styled.p`
  margin: 1rem 0.5rem;
  text-align: center;
  ${media.phone`text-align: left;`};
`

const LogoContainer = styled(BlockElem)`
  ${media.phone`padding-right: 0.8rem;`};
`

const Copyrights = styled(FooterElementsStyle)`
  opacity: 0.6;
  ${media.tablet`margin-right: auto;`};
`

const Contacts = styled(FooterElementsStyle)`
  ${media.tablet`margin-left: auto;`};
`

const FooterLink = css`
  color: ${props => props.theme.lipstick};
  text-decoration: none;
  padding-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`

const ContactLink = styled.a`
  ${FooterLink};
`

const ContributorsLink = styled(NavLink)`
  ${FooterLink} color: #fff;
  display: block;

  &:after {
    content: '❤';
    color: ${props => props.theme.lipstick};
    margin-left: 5px;
    margin-right: 5px;
    font-weight: 900;
    display: inline-block;
    text-decoration: none;
  }
`

const FooterComponent = () => (
  <Footer>
    <Copyrights>
      <LogoContainer>
        <WebpurpleLogoIcon color={'#b3a8c1'} />
      </LogoContainer>
      <BlockElem>
        <span role="img" aria-label="love">
          &#169;
        </span>{' '}
        2013 - {new Date().getFullYear()} Webpurple.
      </BlockElem>
      <BlockElem>All rights reserved.</BlockElem>
    </Copyrights>
    <Contacts>
      <BlockElem>
        <ContributorsLink to="/contributors">Our contributors</ContributorsLink>
      </BlockElem>
      <BlockElem>
        Contact us{' '}
        <ContactLink href="mailto:info@webpurple.com">
          info@webpurple.com
        </ContactLink>
      </BlockElem>
    </Contacts>
  </Footer>
)

export default FooterComponent
