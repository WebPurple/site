import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import ym from 'react-yandex-metrika'
import Hammer from 'hammerjs'

import { media, Media, Z_INDEXES } from '../utils/css-utils'
import WebpurpleLogo from './webpurple-logo/webpurple-logo'
import { MenuIcon, GithubIcon } from './icons'
import { Flex, Box } from 'grid-styled'
import { Portal } from 'react-portal'
import { HiddenText } from '../utils/accessibility'
import Search from './algolia-search'

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  & svg {
    position: absolute;
    right: calc(100% + 1rem);
  }
`

export default class extends React.Component {
  state = {
    isMenuOpen: false,
  }
  static propTypes = {
    isMenuOpen: PropTypes.bool,
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  }
  showMenu = () => {
    document.body.style.overflow = 'hidden'
    return this.setState(pState => ({ ...pState, isMenuOpen: true }))
  }
  hideMenu = () => {
    document.body.style.overflow = 'visible'
    return this.setState(pState => ({ ...pState, isMenuOpen: false }))
  }
  toggle = () => {
    this.state.isMenuOpen ? this.hideMenu() : this.showMenu()
  }
  onSwipe = event => {
    const { deltaX } = event
    if (deltaX < -30) {
      return this.showMenu()
    }
    if (deltaX > 30) {
      this.hideMenu()
    }
  }

  componentDidMount() {
    this.hammer = new Hammer(document.body)
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })
    this.hammer.on('swipe', this.onSwipe)
  }

  componentWillUnmount() {
    this.hammer.off('swipe', this.onSwipe)
  }

  render() {
    return (
      <Flex
        is="header"
        flexDirection={['column', 'row']}
        alignItems={['normal', 'center']}
        m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}>
        <Flex justifyContent="space-between">
          <WebpurpleLogo />

          <Media.MobileOnly>
            <MenuIcon
              onToggle={this.toggle}
              isOpened={this.state.isMenuOpen}
              style={{ zIndex: Z_INDEXES.SIDEBAR_BUTTON }}
            />

            <Portal isOpened={this.state.isMenuOpen}>
              <MobileSidebar
                isOpen={this.state.isMenuOpen}
                onClick={this.hideMenu}>
                <Navbar />
                <Box is={MobileGithubLink} m="7.5rem">
                  Contribute
                </Box>
              </MobileSidebar>
            </Portal>
          </Media.MobileOnly>
        </Flex>

        <Media.TabletPlus values={{ width: 1200, deviceWidth: 1200 }}>
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
      </Flex>
    )
  }
}
