import React, { Component } from 'react'

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

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          onClick: this.showPopup,
        })}
        {this.state.isPlaying && (
          <Popup onRequestClose={this.closePopup}>
            {!this.state.isLoaded && (
              <div>
                <VideoLoader size="80" border="8" />
              </div>
            )}
            <iframe
              src={this.props.src}
              onLoad={this.onVideoLoad}
              style={{ display: this.state.isLoaded ? 'initial' : 'none' }}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </Popup>
        )}
      </React.Fragment>
    )
  }
}

export default Video
