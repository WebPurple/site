import * as React from 'react'
import styled from 'styled-components'

let defaultAngle = 30
let sinusAngle = Math.sin((90 - defaultAngle) / 180 * Math.PI)
let width = 32
let height = width / sinusAngle
let shiftPhoto = height / 2

const injectResponsiveOption = option => ({ responsiveOptions: config }) => {
  if (config[option] === void 0) {
    return ''
  }
  if (config[option] === 'hidden') {
    return 'display: none'
  }
  let responsiveString = ''
  if (config[option].row) {
    responsiveString += `grid-row-start: ${config[option].row};`
  }
  if (config[option].column) {
    responsiveString += `grid-column-start: ${config[option].column};`
  }
  return responsiveString
}

const calculateTurningAngle = option => ({ responsiveOptions: config }) => {
  if (config[option] === void 0) {
    return ''
  }
  return `transform: skewY(${
    config[option].turn === 'right' ? defaultAngle : -defaultAngle
  }deg);`
}

const getReverseAngle = (option, additionalInfo = '') => ({
  responsiveOptions: config,
}) => {
  if (config[option] === void 0) {
    return ''
  }
  return `transform: skewY(${
    config[option].turn === 'right' ? -defaultAngle : defaultAngle
  }deg) ${additionalInfo}`
}

let DiamondPadder = styled.div`
  flex: 1;
`

let DiamondBlock = styled.div`
  flex: 2;
  overflow: hidden;
  color: white;
  position: relative;
  top: 16.85%;
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
let DiamondSkewReset = styled.div`
  top: 25%;
  position: relative;
  z-index: 1;
`

let DiamondWrapper = styled.div`
  ${injectResponsiveOption('desktop')};
  grid-row-end: span 3;
  grid-column-end: span 1;
  display: flex;
  flex-direction: column;

  ${DiamondBlock} {
    ${calculateTurningAngle('desktop')};
  }
  ${DiamondSkewReset} {
    ${getReverseAngle('desktop')};
  }
  ${DiamondPhoto} {
    ${getReverseAngle('desktop', `translateY(${-shiftPhoto}rem)`)};
  }

  @media screen and (max-width: 1280px) {
    ${injectResponsiveOption('tablet')};

    ${DiamondBlock} {
      ${calculateTurningAngle('tablet')};
    }
    ${DiamondSkewReset} {
      ${getReverseAngle('tablet')};
    }
    ${DiamondPhoto} {
      ${getReverseAngle('tablet', `translateY(${-shiftPhoto}rem)`)};
    }
  }
  @media screen and (max-width: 980px) {
    ${injectResponsiveOption('landscape')};

    ${DiamondBlock} {
      ${calculateTurningAngle('landscape')};
    }
    ${DiamondSkewReset} {
      ${getReverseAngle('landscape')};
    }
    ${DiamondPhoto} {
      ${getReverseAngle('landscape', `translateY(${-shiftPhoto}rem)`)};
    }
  }
  @media screen and (max-width: 630px) {
    ${injectResponsiveOption('mobile')};

    ${DiamondBlock} {
      ${calculateTurningAngle('mobile')};
    }
    ${DiamondSkewReset} {
      ${getReverseAngle('mobile')};
    }
    ${DiamondPhoto} {
      ${getReverseAngle('mobile', `translateY(${-shiftPhoto}rem)`)};
    }
  }
`

let SpeakerPhoto = styled(DiamondPhoto)`
  width: 150%;
  height: 150%;
`

let Diamond = ({
  size,
  isTurnLeft,
  backSrc,
  backPosition,
  color,
  hasShadow,
  children,
  responsiveOptions,
}) => (
  <DiamondWrapper responsiveOptions={responsiveOptions}>
    {(() => {
      if (backSrc && !hasShadow) {
        return (
          <DiamondWithPhoto size={size} isTurnLeft={isTurnLeft} cover={color}>
            <DiamondPhoto
              isTurnLeft={isTurnLeft}
              src={backSrc}
              position={backPosition}
            />
            <DiamondSkewReset>{children}</DiamondSkewReset>
          </DiamondWithPhoto>
        )
      }
      if (hasShadow) {
        return (
          <DiamondWithShadow size={size} isTurnLeft={isTurnLeft} color={color}>
            <SpeakerPhoto
              isTurnLeft={isTurnLeft}
              src={backSrc}
              position={backPosition}
            />
          </DiamondWithShadow>
        )
      }
      return (
        <DiamondBlock
          size={size}
          isTurnLeft={isTurnLeft}
          style={{ backgroundColor: color }}>
          <DiamondSkewReset>{children}</DiamondSkewReset>
        </DiamondBlock>
      )
    })()}
    <DiamondPadder />
  </DiamondWrapper>
)

export default Diamond
