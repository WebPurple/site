import styled from 'styled-components'

let RoundImg = styled.div`
  background: url(${props => props.bg}) center;
  background-size: cover;
  ${({ size = '1rem' }) => `
    height: ${size};
    width: ${size};
  `};
  border-radius: 50%;
`

export default RoundImg
