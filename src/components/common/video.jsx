import React, { Component } from 'react'

import VideoLoader from './loader'
import Popup from './popup'

const initialState = {
  isPlaying: false,
  isLoaded: false,
}

class Video extends Component {
  state = initialState

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
        <Popup onRequestClose={this.closePopup} isOpen={this.state.isPlaying}>
          {!this.state.isLoaded ? <VideoLoader size="80" border="8" /> : null}
          <iframe
            src={this.props.src}
            title="Youtube video"
            onLoad={this.onVideoLoad}
            style={{
              display: this.state.isLoaded ? 'initial' : 'none',
              width: '100%',
              height: '100%',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Popup>
      </React.Fragment>
    )
  }
}

export default Video
