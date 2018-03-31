import React from 'react'
import styled, { withTheme } from 'styled-components'

import { media } from '../../utils/css-utils'
import Separator from './separator'

const Header = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 2.6rem;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  padding: 0 3rem;
  margin: 0;
  color: ${({ theme }) => theme.lipstick};
  ${media.tablet`font-size: 4.8rem`};
  ${media.desktop`white-space: nowrap`};
  ${media.tablet`padding: 0 4rem`};
`

export default withTheme(({ theme, children }) => (
  <Separator color={theme.lipstick}>
    <Header>{children}</Header>
  </Separator>
))
