import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import ym from 'react-yandex-metrika'
import { Spring, animated, config } from 'react-spring'

import { media, Media, Z_INDEXES } from '../utils/css-utils'
import WebpurpleLogo from './webpurple-logo/webpurple-logo'
import { MenuIcon, GithubIcon } from './icons'
import { Flex, Box } from 'grid-styled'
import { Portal } from 'react-portal'
import { HiddenText } from '../utils/accessibility'
import Search from './algolia-search'
import SwipeEventEmitter from './swipe.event'

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

let MobileSidebar = styled(animated.nav)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 100%;
  background: #fff;
  transition: all 100ms ease-in-out;
`

let NavbarItem = styled.li`
  list-style: none;
  margin-bottom: 2.5rem;
  ${media.tablet`margin: 0 2rem`};
`

let Navbar = () => (
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
    drawerPosition: 0,
  }
  headerRef = React.createRef()
  static propTypes = {
    isMenuOpen: PropTypes.bool,
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  }
  componentDidMount() {
    this.windowWidth = window ? window.innerWidth : 360
  }

  showMenu = () => {
    document.body.style.overflow = 'hidden'
    return this.setState(pState => ({
      ...pState,
      isMenuOpen: true,
    }))
  }
  hideMenu = () => {
    document.body.style.overflow = 'visible'
    return this.setState(pState => ({
      ...pState,
      isMenuOpen: false,
    }))
  }
  toggle = () => {
    this.state.isMenuOpen ? this.hideMenu() : this.showMenu()
  }

  onSwipeRelease = event => {
    const { distance } = event
    this.setState(pState => ({
      ...pState,
      drawerPosition: 0,
    }))
    if (distance < -130) {
      return this.showMenu()
    }
    if (distance > 130) {
      return this.hideMenu()
    }
  }

  updateDrawerPosition = event => {
    this.setState(pState => ({ ...pState, drawerPosition: event.distance }))
  }

  getDrawerPosition() {
    const { isMenuOpen, drawerPosition } = this.state
    let finalDistance = ''
    if (!isMenuOpen) {
      finalDistance = drawerPosition + 'px'
    }
    if (isMenuOpen) {
      finalDistance = `-${this.windowWidth}px`
    }
    if (isMenuOpen && drawerPosition > 0) {
      finalDistance = -this.windowWidth + drawerPosition + `px`
    }
    return `translateX(${finalDistance})`
  }

  shouldBeSticky() {
    if (this.headerRef.current === null) {
      return false
    }
    const height = this.headerRef.current.getBoundingClientRect().height
    return height < window.pageYOffset
  }

  render() {
    return (
      <Flex
        innerRef={this.headerRef}
        is="header"
        flexDirection={['column', 'row']}
        alignItems={['normal', 'center']}
        m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}
        style={{
          zIndex: Z_INDEXES.SIDEBAR_BUTTON,
        }}>
        <Media.MobileOnly>
          <SwipeEventEmitter
            onRelease={this.onSwipeRelease}
            onHorizontalMove={this.updateDrawerPosition}
          />
          <Flex justifyContent="space-between" alignItems="center">
            <WebpurpleLogo />
            <MenuIcon onToggle={this.toggle} isOpened={this.state.isMenuOpen} />
          </Flex>
          <Portal isOpened={this.state.isMenuOpen}>
            {this.shouldBeSticky() ? (
              <Spring
                native
                to={{
                  opacity: this.state.isMenuOpen ? 1 : 0,
                }}
                delay={this.state.isMenuOpen ? 400 : 0}
                config={config.gentle}>
                {({ opacity }) => (
                  <Flex
                    is={animated.div}
                    justifyContent="space-between"
                    alignItems="center"
                    m={'2rem'}
                    style={{
                      opacity,
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      zIndex: Z_INDEXES.SIDEBAR_BUTTON,
                    }}>
                    <WebpurpleLogo />
                    <MenuIcon
                      onToggle={this.toggle}
                      isOpened={this.state.isMenuOpen}
                    />
                  </Flex>
                )}
              </Spring>
            ) : null}
            <Spring
              native
              to={{
                translation: this.getDrawerPosition(),
              }}
              immediate={name =>
                this.state.drawerPosition !== 0 && name === 'translation'
              }
              config={config.gentle}>
              {({ translation }) => (
                <MobileSidebar style={{ transform: translation }}>
                  <Navbar />
                  <Box is={MobileGithubLink} m="7.5rem">
                    Contribute
                  </Box>
                </MobileSidebar>
              )}
            </Spring>
          </Portal>
        </Media.MobileOnly>

        <Media.TabletPlus values={{ width: 1200, deviceWidth: 1200 }}>
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
      </Flex>
    )
  }
}
