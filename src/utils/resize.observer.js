import React, { Component } from 'react'

class ResizeObserver extends Component {
  container = React.createRef()

  state = {
    width: null,
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.setState({
      width: this.container.current.getBoundingClientRect().width,
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      width: this.container.current.getBoundingClientRect().width,
    })
  }

  render() {
    return (
      <div ref={this.container}>{this.props.children(this.state.width)}</div>
    )
  }
}

export default ResizeObserver
