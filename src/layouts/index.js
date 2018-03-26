import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'

import { media } from '../utils/css-utils'
import Header from '../components/header'

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  width: 100%;
  ${media.desktop`width: 1280px;`} ${media.hd`width: 1440px;`};
`

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
}

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Helmet title="WebPurple" />
      <Header />
      <main>{children()}</main>
    </Container>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
