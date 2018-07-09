// @flow
import * as React from 'react'
import styled from 'styled-components'
import { tColor } from '../utils/css-utils'

const MainText = styled.h1`
  font-family: Rubik, sans-serif;
  font-size: 7.8rem;
  font-weight: 500;
  color: ${tColor('lipstick')};
  text-align: center;
`

const PageNotFound = () => <MainText>Page not found</MainText>

export default PageNotFound
