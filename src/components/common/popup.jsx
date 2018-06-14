import * as React from 'react'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'
import styled, { injectGlobal } from 'styled-components'
import { media } from '../../utils/css-utils'

import CloseIcon from '../icons/close-icon'

injectGlobal`
  body.popup-opened {
    overflow: hidden;
    & > *:not(:last-child) {
      filter: blur(3px);
    }
  } 
`

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
  background-color: rgba(94, 94, 94, 0.13);
`

const PopupWindow = styled.div`
  position: relative;
  width: 90%;
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

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  width: auto;
  height: auto;
  right: -4rem;
  top: -2rem;
  left: auto;

  &:hover #closeIcon {
    stroke: #ababab;
  }
  ${media.phone &&
    `
    display: none;
  `};
`

class Popup extends React.Component {
  render() {
    const { children, onRequestClose } = this.props
    return (
      <Portal>
        <PopupContainer>
          <Shadow onClick={onRequestClose} />
          <PopupWindow>
            <IconButton onClick={onRequestClose}>
              <CloseIcon />
            </IconButton>
            {children}
          </PopupWindow>
        </PopupContainer>
      </Portal>
    )
  }

  componentDidMount() {
    document.querySelector('body').classList.add('popup-opened')
    document.addEventListener('keydown', this.closeOnEscape)
  }
  componentWillUnmount() {
    document.querySelector('body').classList.remove('popup-opened')
    document.removeEventListener('keydown', this.closeOnEscape)
  }

  closeOnEscape = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.props.onRequestClose()
    }
  }
}

export default Popup

Popup.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
}
