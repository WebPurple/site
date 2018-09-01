// @flow
import * as React from 'react'
import styled from 'styled-components'

import { media } from '../../utils/css-utils'
import { SearchIcon } from '../icons'

export const FilterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0;
  border-bottom: 2px solid #ededed;
`

const SearchWrapper = styled.label`
  position: relative;
  padding-right: 4rem;
  width: 100%;
  ${media.tablet`width: initial;`};
`

const SearchInput = styled.input`
  padding: 1.6rem 0;
  ${media.desktop`padding: 2.4rem 0`};
  border: 0;
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

export const Search = (props: {|
  placeholder: string,
  onFocus: Function,
  onBlur: Function,
  onChange: Function,
|}) => (
  <SearchWrapper>
    <SearchInput type="text" {...props} />
    <StyledSearchIcon />
  </SearchWrapper>
)
