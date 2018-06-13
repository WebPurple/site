import React, { Component } from 'react'
import { Portal } from 'react-portal'
import styled from 'styled-components'
import concat from 'ramda/src/concat'
import id from 'ramda/src/identity'

import { Media } from '../../utils/css-utils'
import Loader from './loader'

const ESC_KEY_CODE = 27

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Shadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(200, 197, 197, 0.56);
`

const PopupWindow = styled.div`
  position: relative;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 75rem;

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: 56.25%;
  }

  & > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

const VideoLoader = Loader.extend`
  &:after {
    background-color: rgb(231, 216, 216);
  }
`

const initialState = {
  isPlaying: false,
  isLoaded: false,
}

class Video extends Component {
  state = initialState

  /**
   * @param {Event} event
   */
  showPopup = event => {
    event.preventDefault()
    document.querySelector('body').style.overflow = 'hidden'
    document.addEventListener('keydown', this.closeOnEscape)
    this.setState({ isPlaying: true })
  }

  closePopup = () => {
    this.setState(initialState)
    document.querySelector('body').style.overflow = 'visible'
    document.removeEventListener('keydown', this.closeOnEscape)
  }

  onVideoLoad = () => {
    this.setState({ isLoaded: true })
  }

  /**
   * @param {KeyboardEvent} event
   */
  closeOnEscape = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.closePopup()
    }
  }

  componentWillUnmount() {
    document.querySelector('body').style.overflow = 'visible'
  }

  setEmebededUrl = concat('https://www.youtube.com/embed/')
  setRedirectUrl = concat('https://www.youtube.com/watch?v=')

  render() {
    return (
      <React.Fragment>
        <Media.MobileOnly>
          {this.props.children({
            onClick: id,
            src: this.setRedirectUrl(this.props.src),
          })}
        </Media.MobileOnly>
        <Media.TabletPlus>
          {this.props.children({
            onClick: this.showPopup,
            src: this.setEmebededUrl(this.props.src),
          })}
          {this.state.isPlaying && (
            <Portal>
              <PopupContainer>
                <Shadow onClick={this.closePopup} />
                {!this.state.isLoaded && <VideoLoader size="80" border="8" />}
                <PopupWindow
                  style={{ display: this.state.isLoaded ? 'initial' : 'none' }}>
                  <iframe
                    src={this.setEmebededUrl(this.props.src)}
                    onLoad={this.onVideoLoad}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </PopupWindow>
              </PopupContainer>
            </Portal>
          )}
        </Media.TabletPlus>
      </React.Fragment>
    )
  }
}

export default Video
