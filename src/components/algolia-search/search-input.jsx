import * as React from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../icons'

let Label = styled.label`
  position: relative;
  display: block;
`

let StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 13px;
  fill: ${({ theme }) => theme.warmPurple};
`

let Input = styled.input`
  font-size: 18px;
  padding: 12px 12px 12px 40px;
  border: none;
  border-radius: 3px;
  outline: none;
  color: ${({ theme }) => theme.warmPurple};
  &::placeholder {
    color: ${({ theme }) => theme.warmPurple};
  }

  transition: width 0.3s;

  width: 70px;
  &:active,
  &:focus {
    width: 130px;
    background: ${({ theme }) => theme.liliac};
  }
`

let SearchInput = React.forwardRef(({ className, ...rest }, ref) => (
  <Label innerRef={ref} className={className}>
    <StyledSearchIcon />
    <Input {...rest} />
  </Label>
))

export { SearchInput }

export default SearchInput
