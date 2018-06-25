import { Component } from 'react'

class SwipeEventEmitter extends Component {
  startCoords = {
    x: null,
    y: null,
  }

  static defaultProps = {
    onHorizontalMove: () => {},
    onVerticalMove: () => {},
    onRelease: () => {},
    horizontalOnly: true,
    offset: 30,
  }
  componentDidMount() {
    document.body.addEventListener('touchstart', this.handleStart)
    document.body.addEventListener('touchmove', this.handleMove)
    document.body.addEventListener('touchend', this.handleEnd)
    document.body.addEventListener('mousedown', this.handleStart)
    document.body.addEventListener('mousemove', this.handleMove)
    document.body.addEventListener('mouseup', this.handleEnd)
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.handleStart)
    document.body.removeEventListener('touchmove', this.handleMove)
    document.body.removeEventListener('touchend', this.handleEnd)
    document.body.removeEventListener('mousedown', this.handleStart)
    document.body.removeEventListener('mousemove', this.handleMove)
    document.body.removeEventListener('mouseup', this.handleEnd)
  }

  handleStart = e => {
    this.startCoords = this.getCoordsFromEvent(e)
  }

  handleEnd = e => {
    const [katet1, katet2] = this.getKatets(e)
    this.startCoords = {
      x: null,
      y: null,
    }
    if (this.props.horizontalOnly && this.isHorizontal(katet1, katet2)) {
      return this.props.onRelease({ distance: katet1 })
    }
  }

  handleMove = e => {
    const { onHorizontalMove, onVerticalMove } = this.props
    const [katet1, katet2] = this.getKatets(e)
    if (this.isHorizontal(katet1, katet2)) {
      onHorizontalMove({ distance: katet1 })
    }
    if (this.isHorizontal(katet1, katet2)) {
      onVerticalMove({ distance: katet2 })
    }
  }

  isHorizontal(x, y) {
    return Math.abs(y) < this.props.offset && Math.abs(x) > this.props.offset
  }
  isVertical(x, y) {
    return Math.abs(x) < this.props.offset && Math.abs(y) > this.props.offset
  }

  getKatets(event) {
    const currentCoords = this.getCoordsFromEvent(event)
    const katet1 = currentCoords.x - this.startCoords.x
    const katet2 = currentCoords.y - this.startCoords.y
    return [katet1, katet2]
  }

  getCoordsFromEvent(event) {
    if (event.changedTouches) {
      return {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      }
    }

    return {
      x: event.screenX,
      y: event.screenY,
    }
  }
  render() {
    return null
  }
}

export default SwipeEventEmitter
