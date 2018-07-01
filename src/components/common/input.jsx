import * as React from 'react'
import styled from 'styled-components'

const InputGroup = styled.label`
  align-items: center;
  border: 1px solid #ccc;
  display: flex;
  padding: 2.1em 1.6em;
`

const InputField = styled.input`
  border: none;
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 10;
  font-size: 1.8em;
  min-width: 0;
  outline: none;
`

const Input = ({ style, rightIcon, leftIcon, ...inputProps }) => (
  <InputGroup style={style}>
    {leftIcon}
    <InputField
      style={{
        marginLeft: leftIcon ? '1.6rem' : 0,
        marginRight: rightIcon ? '1.6rem' : 0,
      }}
      {...inputProps}
    />
    {rightIcon}
  </InputGroup>
)

export default Input

Input.propTypes = {
  style: PropTypes.object,
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
}
