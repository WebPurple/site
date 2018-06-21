import * as React from 'react'
import { css } from 'styled-components'
import Responsive from 'react-responsive'
import canUseDom from 'can-use-dom'

export let sizes = {
  phone: 599,
  tablet: 768,
  desktop: 1200,
  hd: 1800,
}

export let BrowserOnly = ({ children }) => (canUseDom ? children : null)

export let Media = {
  MobileOnly: props => <Responsive {...props} maxWidth={sizes.tablet - 1} />,
  TabletPlus: props => <Responsive {...props} minWidth={sizes.tablet} />,
  DesktopPlus: props => <Responsive {...props} minWidth={sizes.desktop} />,
  WidePlus: props => <Responsive {...props} minWidth={sizes.hd} />,
}

export let media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  let emSize = sizes[label] / 16

  // eslint-disable-next-line no-param-reassign
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `

  return accumulator
}, {})

export let isHD = () =>
  typeof window !== 'undefined' && window.innerWidth >= sizes.hd

export let isDesktop = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth >= sizes.desktop && window.innerWidth < sizes.hd)

export let isTablet = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth >= sizes.tablet && window.innerWidth < sizes.desktop)

export let isPhone = () => {
  return typeof window !== 'undefined' && window.innerWidth < sizes.tablet
}

export let Z_INDEXES = {
  LOGO: 1,
  SIDEBAR_BUTTON: 1,
}
