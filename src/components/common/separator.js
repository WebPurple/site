import styled from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;

  &:before,
  &:after {
    content: '';
    width: 100%;
    height: ${props => props.height || 3}px;
    background: ${props => props.color || '#000'};
  }
`
