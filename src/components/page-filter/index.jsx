import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { media } from '../../utils/css-utils'
import { SearchIcon } from '../icons'

export const FilterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0;
  border-bottom: 2px solid #ededed;
`

export const FilterMenuLink = styled(NavLink)`
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 1.6rem 0;
  ${media.desktop`padding: 2.4rem 0;`} margin: 0 2.5rem 0 0;
  ${media.desktop`margin: 0 4.8rem 0 0;`} text-decoration: none;
  color: ${props => props.theme.greyishBrown};
  font-size: 1.8rem;
  ${media.desktop`font-size: 2.4rem;`} font-weight: bold;
  font-family: 'Rubik', sans-serif;

  &:after {
    /* this might should be done via activeClassName https://github.com/styled-components/styled-components/issues/184 */
    content: ${props => (props['data-active'] ? '""' : 'none')};
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -2px;
    border-bottom: 4px solid ${props => props.theme.lipstick};
  }

  &:hover {
    &:after {
      content: '';
    }
  }
`

export const FilterTab = FilterMenuLink.extend``

const SearchWrapper = styled.label`
  position: relative;
  padding-right: 4rem;
  width: 100%;
  ${media.tablet`width: initial;`};
`

const SearchInput = styled.input`
  padding: 1.6rem 0;
  ${media.desktop`padding: 2.4rem 0;`} border: 0;
  font-size: 2.4rem;
  line-height: 2.8rem;
  outline: none;

  width: 0;
  &:focus {
    width: 100%; /* TODO: animate */
    ${media.tablet`width: 25rem;`};
  }
  ${media.tablet`width: 25rem;`};
`

// TODO: change color of icon if input is not empty
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 0;
  padding: 1.6rem 0;
  ${media.desktop`padding: 2.4rem 0;`} height: 2.8rem;
  width: 2.8rem;
  fill: #ccc;
`

export const Search = props => (
  <SearchWrapper>
    <SearchInput type="text" {...props} />
    <StyledSearchIcon />
  </SearchWrapper>
)

Search.propTypes = {
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}
