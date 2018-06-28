import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { WebpurpleIcon } from '../icons/header'

let Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`

let Title = styled.span`
  font-size: 2.6rem;
  margin: 0;
  text-transform: uppercase;
  font-family: Rubik, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.lipstick};
`

let StyledWebpurpleIcon = styled(WebpurpleIcon)`
  margin-right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
`

let WebpurpleLogo = () => (
  <Logo to="/">
    <StyledWebpurpleIcon />
    <Title>Webpurple</Title>
  </Logo>
)

export default WebpurpleLogo
