import React, { Component } from 'react'
import concat from 'ramda/src/concat'
import id from 'ramda/src/identity'

import { Media } from '../../utils/css-utils'
import Loader from './loader'
import Popup from './popup'

const VideoLoader = Loader.extend`
  &:after {
    background-color: rgb(229, 212, 212);
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
    this.setState({ isPlaying: true })
  }

  closePopup = () => {
    this.setState(initialState)
  }

  onVideoLoad = () => {
    this.setState({ isLoaded: true })
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
            <Popup onRequestClose={this.closePopup}>
              {!this.state.isLoaded && (
                <div>
                  <VideoLoader size="80" border="8" />
                </div>
              )}
              <iframe
                src={this.setEmebededUrl(this.props.src)}
                onLoad={this.onVideoLoad}
                style={{ display: this.state.isLoaded ? 'initial' : 'none' }}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Popup>
          )}
        </Media.TabletPlus>
      </React.Fragment>
    )
  }
}

export default Video
