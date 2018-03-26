import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'

import Header from '../components/header'

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  width: 100%;
  ${media.desktop`width: 1280px;`} ${media.hd`width: 1440px;`};
`

const TemplateWrapper = ({ children }) => (
  <Container>
    <Helmet title="WebPurple" />
    <Header />
    <main>{children()}</main>
  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
