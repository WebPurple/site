import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { Flex } from 'grid-styled'

import { sizes } from '../utils/css-utils'
import Header from '../components/header'
import Footer from '../components/footer'

const theme = {
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

  breakpoints: Object.values(sizes).slice(1).map(s => `${s / 16}em`),
}

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Flex flexDirection="column">
      <Helmet title="WebPurple" />
      <Header />
      <main>{children()}</main>
      <Footer />
    </Flex>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
