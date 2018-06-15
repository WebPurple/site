import * as React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import styled, { injectGlobal } from 'styled-components'
import { media } from '../../utils/css-utils'

import CloseIcon from '../icons/close-icon'

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
    & > *:not(.ReactModalPortal) {
      filter: blur(3px);
    }
  }
`

const ESC_KEY_CODE = 27

const PopupWindowContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PopupWindow = styled.div`
  position: relative;

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: 56.25%;
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
const customStyles = {
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(94, 94, 94, 0.13)',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    border: 'none',
    borderRadius: 'none',
    maxHeight: '100vh',
    overflow: 'auto',
    padding: '0',
    position: 'static',
    width: '90%',
    maxWidth: '75rem',
    backgroundColor: 'transparent',
  },
}

Modal.setAppElement('#___gatsby')

class Popup extends React.Component {
  render() {
    const { children, onRequestClose, ...rest } = this.props
    return (
      <Modal
        {...rest}
        onRequestClose={onRequestClose}
        parentSelector={this.getDocumentBody}
        style={customStyles}>
        <PopupWindow>
          <PopupWindowContainer>
            <IconButton onClick={onRequestClose}>
              <CloseIcon />
            </IconButton>
            {children}
          </PopupWindowContainer>
        </PopupWindow>
      </Modal>
    )
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEscape)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEscape)
  }

  closeOnEscape = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.props.onRequestClose()
    }
  }

  getDocumentBody = () => document.body
}

export default Popup

Popup.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
}
