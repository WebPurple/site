// @flow
import * as React from 'react'
import { css } from 'styled-components'
import Responsive from 'react-responsive'
import canUseDom from 'can-use-dom'

export let colors = {
  grape: '#432867',
  warmGrey: '#a1a1a1',
  greyishBrown: '#545454',
  lipstick: '#e62270',
  vividPurple: '#9012fe',
  vividPurpleTwo: '#9013fe',
  cerise: '#ee2a7b',
  warmPurple: '#662d91',
  rouge: '#b21d3d',
  rosePink: '#f290b7',
  liliac: '#c788fe',
}

export type ColorName = $Keys<typeof colors>

export type ThemeProps = {
  theme?: { colors?: typeof colors },
}

export let tColor = (colorName: ColorName) => ({
  theme: { colors: cls = colors } = {},
}: ThemeProps = {}) => cls[colorName]

export let sizes = {
  phone: 599,
  tablet: 768,
  desktop: 1200,
  hd: 1800,
}

export let BrowserOnly = ({ children }: { children: React.Node }) =>
  canUseDom ? children : null

export let Media = {
  MobileOnly: (props: any) => (
    <Responsive {...props} maxWidth={sizes.tablet - 1} minWidth={320} />
  ),
  TabletPlus: (props: any) => <Responsive {...props} minWidth={sizes.tablet} />,
  DesktopPlus: (props: any) => (
    <Responsive {...props} minWidth={sizes.desktop} />
  ),
  WidePlus: (props: any) => <Responsive {...props} minWidth={sizes.hd} />,
  SeoOnly: (props: any) => (
    <Responsive
      {...props}
      minWidth={10}
      maxWidth={20}
      values={{ width: 20, deviceWidth: 20 }}
    />
  ),
}

export let media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  let emSize = sizes[label] / 16

  // eslint-disable-next-line no-param-reassign
  accumulator[label] = (...args: any[]) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `

  return accumulator
}, {})

export let Z_INDEXES = {
  LOGO: 1,
  SIDEBAR_BUTTON: 1,
}
