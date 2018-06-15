import * as React from 'react'
import styled from 'styled-components'

let defaultAngle = 30
let sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI)
let width = 32
let height = width / sinusAngle
let shiftPhoto = height / 2

let EmptyDiamond = styled.div`
  width: ${props => props.size || width}rem;
  height: ${props => props.size / sinusAngle || height}rem;
`

let DiamondBlock = styled(EmptyDiamond)`
  transform: skewY(
    ${props => (props.isTurnLeft ? -defaultAngle : defaultAngle)}deg
  );
  overflow: hidden;
  color: white;
`

let DiamondWithPhoto = styled(DiamondBlock)`
  position: relative;

  &:after {
    opacity: 0.7;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 100%;
    width: 100%;
    background-color: ${props => props.cover};
  }
`

let DiamondPhoto = styled.div`
  transform: ${props =>
    props.isTurnLeft
      ? 'skewY(' + defaultAngle + 'deg)'
      : 'skewY(' + -defaultAngle + 'deg) translateY(' + -shiftPhoto + 'rem)'};

  position: absolute;
  top: 0;

  background-size: cover;
  filter: grayscale(100%);
  width: 200%;
  height: 200%;

  background-image: url(${props => props.src});
  background-position: ${props => props.position};
`

let DiamondWithShadow = styled(DiamondWithPhoto)`
  box-shadow: 1.2rem 1.4rem ${props => props.color};
`

let SpeakerPhoto = styled(DiamondPhoto)`
  width: 150%;
  height: 150%;
`

let Diamond = ({
  isEmpty,
  size,
  isTurnLeft,
  backSrc,
  backPosition,
  color,
  hasShadow,
  children,
}) =>
  (isEmpty && <EmptyDiamond size={size} />) ||
  (!backSrc &&
    !hasShadow && (
      <DiamondBlock
        size={size}
        isTurnLeft={isTurnLeft}
        style={{ backgroundColor: color }}>
        {children}
      </DiamondBlock>
    )) ||
  (backSrc &&
    !hasShadow && (
      <DiamondWithPhoto size={size} isTurnLeft={isTurnLeft} cover={color}>
        <DiamondPhoto
          isTurnLeft={isTurnLeft}
          src={backSrc}
          position={backPosition}
        />
        {children}
      </DiamondWithPhoto>
    )) ||
  (hasShadow && (
    <DiamondWithShadow size={size} isTurnLeft={isTurnLeft} color={color}>
      <SpeakerPhoto
        isTurnLeft={isTurnLeft}
        src={backSrc}
        position={backPosition}
      />
    </DiamondWithShadow>
  ))

export default Diamond
