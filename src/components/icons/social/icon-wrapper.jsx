import styled from 'styled-components'
import map from 'ramda/src/map'
import compose from 'ramda/src/compose'
import join from 'ramda/src/join'
import toPairs from 'ramda/src/toPairs'

export const SVG = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  'aria-hidden': 'true',
})`
  height: ${props => props.height || '2.4rem'};
`

export const prepareFillColors = colorMap => ({
  greyscale = true,
  greyColor = '#a1a1a1',
}) => {
  const setStyleRule = ([key, value]) => {
    const firstPart = `& ${key} {fill: ${greyscale ? greyColor : value}}`

    return !greyscale
      ? firstPart
      : firstPart.concat(`\n &:hover ${key} {fill: ${value}}`)
  }

  return compose(
    join('\n'),
    map(setStyleRule),
    toPairs,
  )(colorMap)
}
