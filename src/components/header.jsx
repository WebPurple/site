import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { compose, withStateHandlers } from 'recompose'

import { media, Media, Z_INDEXES } from '../utils/css-utils'
import WebpurpleLogo from './webpurple-logo/webpurple-logo'
import { CloseIcon, MenuIcon } from './icons/header/index'
import { Flex } from 'grid-styled'
import { Portal } from 'react-portal'

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

let MobileSidebar = styled.nav`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 100%;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(-100%)' : '')};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  background: #fff;
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
      mx={['7.5rem', '4rem']}>
      <NavbarItem>
        <NavigationLink to="/" exact>
          home
        </NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/events">events</NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/speakers">speakers</NavigationLink>
      </NavbarItem>
      <NavbarItem>
        <NavigationLink to="/blog">blog</NavigationLink>
      </NavbarItem>
    </Flex>
  </nav>
)

let Header = ({ isMenuOpen, showMenu, hideMenu }) => (
  <Flex
    is="header"
    flexDirection={['column', 'row']}
    m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}>
    <Flex justifyContent="space-between">
      <WebpurpleLogo />
      <Media.MobileOnly>
        {isMenuOpen ? (
          <CloseIcon
            onClick={hideMenu}
            style={{ zIndex: Z_INDEXES.SIDEBAR_BUTTON }}
          />
        ) : (
          <MenuIcon
            onClick={showMenu}
            style={{ zIndex: Z_INDEXES.SIDEBAR_BUTTON }}
          />
        )}
        <Portal isOpened={isMenuOpen}>
          <MobileSidebar isOpen={isMenuOpen} onClick={hideMenu}>
            <Navbar />
          </MobileSidebar>
        </Portal>
      </Media.MobileOnly>
    </Flex>
    <Media.TabletPlus>
      <Navbar />
    </Media.TabletPlus>
  </Flex>
)

Header.propTypes = {
  isMenuOpen: PropTypes.bool,
  showMenu: PropTypes.func,
  hideMenu: PropTypes.func,
}

export default compose(
  withStateHandlers(
    () => ({
      isMenuOpen: false,
    }),
    {
      showMenu: () => () => ({ isMenuOpen: true }),
      hideMenu: () => () => ({ isMenuOpen: false }),
    },
  ),
)(Header)
