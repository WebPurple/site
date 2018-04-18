import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import { media } from '../../utils/css-utils'
import Separator from './separator'

let Header = styled.h2`
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

let BlockHeader = withTheme(({ theme, children, size }) => {
  let H = Header.withComponent(size)

  return (
    <Separator color={theme.lipstick}>
      <H>{children}</H>
    </Separator>
  )
})

BlockHeader.propTypes = {
  size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
}

BlockHeader.defaultProps = {
  size: 'h2',
}

export default BlockHeader
