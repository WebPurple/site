import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spring, animated, config } from 'react-spring'
import { Flex } from 'grid-styled'
import { Portal } from 'react-portal'

import { Z_INDEXES } from '../../utils/css-utils'
import SwipeEventEmitter from '../swipe.event'
import { MenuIcon } from '../icons'

let MobileSidebar = styled(animated.nav)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 100%;
  overflow: auto;
  background: #fff;
  transition: ${props =>
    props.transitioned ? 'all 50ms ease-in-out' : 'none'};
`

class MobileMenu extends Component {
  state = {
    isMenuOpen: false,
    drawerPosition: 0,
  }
  headerRef = React.createRef()

  static propTypes = {
    stickyOffset: PropTypes.number,
  }

  static defaultProps = {
    stickyOffset: 35,
  }

  componentDidMount() {
    window.addEventListener('resize', this.setInnerWidth)
    this.setInnerWidth()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setInnerWidth)
  }
  setInnerWidth = () => {
    this.windowWidth = window ? window.innerWidth : 360
    console.log(this.windowWidth)
  }

  render() {
    return (
      <React.Fragment>
        <SwipeEventEmitter
          onRelease={this.onSwipeRelease}
          onHorizontalMove={this.updateDrawerPosition}
        />
        <Flex justifyContent="space-between" alignItems="center">
          {this.props.renderLogo()}
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
              config={config.stiff}>
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
                    overflow: 'scroll',
                  }}>
                  {this.props.renderLogo()}
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
            config={config.stiff}>
            {({ translation }) => (
              <MobileSidebar
                style={{ transform: translation }}
                transitioned={this.state.drawerPosition === 0}>
                {this.props.children}
              </MobileSidebar>
            )}
          </Spring>
        </Portal>
      </React.Fragment>
    )
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
    return this.props.stickyOffset < window.pageYOffset
  }
  updateDrawerPosition = event => {
    this.setState(pState => ({ ...pState, drawerPosition: event.distance }))
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
}

export default MobileMenu
