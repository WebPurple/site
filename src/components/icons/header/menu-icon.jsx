import React from 'react'
import { Spring, config } from 'react-spring'
import { withTheme } from 'styled-components'

const MenuIcon = ({ leftBar, centerBar, rightBar, color, ...otherProps }) => (
  <svg
    {...otherProps}
    width="30"
    height="25"
    viewBox="0 0 30 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="5" transform={leftBar} fill={color} />
    <rect width="30" height="5" transform={centerBar} fill={color} />
    <rect width="30" height="5" transform={rightBar} fill={color} />
  </svg>
)

const openBars = {
  leftBar: 'translate(0) rotate(0)',
  centerBar: 'translate(0 10) rotate(0)',
  rightBar: 'translate(0 20) rotate(0)',
}

const closeBars = {
  leftBar: 'translate(3.53552) rotate(45)',
  centerBar: 'translate(3.53998 0.125641) rotate(45)',
  rightBar: 'translate(0 21.2132) rotate(-45)',
}

export default withTheme(({ isOpened, onShow, onHide, style, theme }) => (
  <Spring to={isOpened ? closeBars : openBars} config={config.gentle}>
    {barProps => (
      <MenuIcon
        onClick={isOpened ? onHide : onShow}
        style={style}
        {...barProps}
        color={theme.lipstick}
      />
    )}
  </Spring>
))
