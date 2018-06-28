import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import ym from 'react-yandex-metrika'

import { media, Media, Z_INDEXES } from '../utils/css-utils'
import WebpurpleLogo from './webpurple-logo/webpurple-logo'
import { GithubIcon } from './icons'
import { Flex, Box } from 'grid-styled'
import { HiddenText } from '../utils/accessibility'
import Search from './algolia-search'
import MobileMenu from './mobile-menu/mobile-menu'

let NavigationLink = styled(Link).attrs({
  activeClassName: 'active',
})`
  text-decoration: none;
  text-transform: uppercase;
  font-family: Rubik, sans-serif;
  font-size: 2.3rem;
  font-weight: 500;
  color: ${props => props.theme.warmGrey};
  ${media.tablet`
    font-size: 1.8rem;
  `};
  display: inline-block;
  padding: 1.2rem 0;
  border-bottom: solid 0.3rem transparent;
  transition: border-color 1s ease-out;

  &:hover,
  &.active {
    border-bottom-color: ${props => props.theme.lipstick};
  }
`

let NavbarItem = styled.li`
  list-style: none;
  margin-bottom: 2.5rem;
  ${media.tablet`margin: 0 2rem`};
`

let Navbar = () => (
  <nav>
    <Flex
      is="ul"
      flexDirection={['column', 'row']}
      p={0}
      m={0}
      mt={['10rem', 0]}
      mx={['7.5rem', '4rem']}
      flex={'1 0 auto'}>
      <NavbarItem>
        <NavigationLink to="/" exact>
          home
        </NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/events/">events</NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/speakers/">speakers</NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/blog/">blog</NavigationLink>
      </NavbarItem>
    </Flex>
  </nav>
)

let GitHubLink = ({ children, className }) => (
  <Flex
    is="a"
    className={className}
    onClick={() => ym('reachGoal', 'gh-contribute')}
    href="https://github.com/kitos/web-purple"
    title="Contribute"
    target="_blank"
    rel="noopener noreferrer">
    <GithubIcon />
    <span>{children}</span>
  </Flex>
)

let MobileGithubLink = NavigationLink.withComponent(GitHubLink).extend`
  position: relative;
  margin-top: 0;
  & svg {
    position: absolute;
    right: calc(100% + 1rem);
  }
`

export default () => (
  <Flex
    is="header"
    flexDirection={['column', 'row']}
    alignItems={['normal', 'center']}
    m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}
    style={{
      zIndex: Z_INDEXES.SIDEBAR_BUTTON,
    }}>
    <Media.MobileOnly>
      <MobileMenu stickyOffset={75} renderLogo={() => <WebpurpleLogo />}>
        <Navbar />
        <Box is={MobileGithubLink} m="7.5rem">
          Contribute
        </Box>
      </MobileMenu>
    </Media.MobileOnly>
    <Media.TabletPlus>
      <WebpurpleLogo />
      <Flex justifyContent="space-between" flex="1">
        <Navbar />
        <Flex alignItems="center">
          <Box is={Search} mr="20px" />
          <GitHubLink>
            <HiddenText>Contribute</HiddenText>
          </GitHubLink>
        </Flex>
      </Flex>
    </Media.TabletPlus>
    <Media.SeoOnly>
      <WebpurpleLogo />
      <section style={{ left: '-9999px', position: 'absolute' }}>
        <Navbar />
        <Box is={Search} mr="20px" />
      </section>
    </Media.SeoOnly>
  </Flex>
)
