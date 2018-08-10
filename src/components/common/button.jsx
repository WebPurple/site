import styled from 'styled-components'

const Button = styled.button`
  border: solid 3px ${props => props.defaultSheme};
  cursor: pointer;
  background: transparent;
  text-transform: uppercase;
  font-size: 2.4em;
  padding: 0.83em 1.25em;
  font-weight: bold;
  color: ${props => props.defaultSheme};
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background: ${props => props.defaultSheme};
    color: ${props => props.hoverColor};
  }
`

export default Button
