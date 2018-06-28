import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring'
import { Flex } from 'grid-styled'
import { Portal } from 'react-portal'

import SwipeEventEmitter from '../swipe.event'
import { MenuIcon } from '../icons'

let MobileSidebar = styled.div.attrs({
  style: ({ translation }) => ({
    transform: `translateX(${translation || 0}px)`,
  }),
})`
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

  static propTypes = {
    stickyOffset: PropTypes.number,
  }

  static defaultProps = {
    stickyOffset: 75,
  }

  componentDidMount() {
    document.body.style.overflow = 'visible'
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
          <MenuIcon
            onShow={this.showMenu}
            onHide={this.hideMenu}
            isOpened={this.state.isMenuOpen}
          />
        </Flex>
        <Portal>
          <Spring
            to={this.getAnimationPose()}
            immediate={name =>
              this.state.drawerPosition !== 0 && name === 'translation'
            }>
            {({ translation, opacity }) => (
              <MobileSidebar
                translation={translation}
                transitioned={this.state.drawerPosition === 0}>
                {this.isSticky() ? (
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    m={'2rem'}
                    style={{
                      opacity,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                    }}>
                    {this.props.renderLogo()}
                    <MenuIcon
                      onShow={this.showMenu}
                      onHide={this.hideMenu}
                      isOpened={this.state.isMenuOpen}
                    />
                  </Flex>
                ) : null}
                {this.props.children}
              </MobileSidebar>
            )}
          </Spring>
        </Portal>
      </React.Fragment>
    )
  }
  getAnimationPose() {
    const { isMenuOpen, drawerPosition } = this.state
    let windowWidth = window.innerWidth
    let finalDistance = ''
    if (!isMenuOpen) {
      finalDistance = drawerPosition
    }
    if (isMenuOpen) {
      finalDistance = -windowWidth
    }
    if (isMenuOpen && drawerPosition > 0) {
      finalDistance = -windowWidth + drawerPosition
    }
    return {
      translation: finalDistance,
      opacity: -finalDistance / windowWidth,
    }
  }
  isSticky() {
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
    return this.setState({
      isMenuOpen: true,
    })
  }
  hideMenu = () => {
    document.body.style.overflow = 'visible'
    return this.setState({
      isMenuOpen: false,
    })
  }
}

export default MobileMenu
