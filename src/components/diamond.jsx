import * as React from 'react'
import styled from 'styled-components'

let defaultAngle = 30
let sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI)
export let width = 32
export const calculateHeight = width => (width / sinusAngle / 2) * 3
export let height = width / sinusAngle
let shiftPhoto = height / 2

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

const getWrapperTransformOptions = option => ({ turningPoints }) => {
  if (turningPoints === void 0 || turningPoints[option] === void 0) {
    return ''
  }
  const turnedRight = turningPoints[option] === 'right'
  return `
    transform: skewY(
      ${turnedRight ? defaultAngle : -defaultAngle}deg
    )`
}

const getResetTransformOptions = option => ({ turningPoints }) => {
  if (turningPoints === void 0 || turningPoints[option] === void 0) {
    return ''
  }
  const turnedRight = turningPoints[option] === 'right'
  return `
    transform: skewY(
      ${turnedRight ? -defaultAngle : defaultAngle}deg
    )`
}

const getPhotoTransformOptions = option => ({ turningPoints }) => {
  if (turningPoints === void 0 || turningPoints[option] === void 0) {
    return ''
  }
  const turnedRight = turningPoints[option] === 'right'
  const verticalOffset = turnedRight ? `translateY(-${shiftPhoto}rem)` : ''
  return `
    transform: skewY(
      ${turnedRight ? -defaultAngle : defaultAngle}deg
    ) ${verticalOffset}`
}

let DiamondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${DiamondBlock} {
    ${getWrapperTransformOptions('desktop')};
  }
  ${DiamondSkewReset} {
    ${getResetTransformOptions('desktop')};
  }
  ${DiamondPhoto} {
    ${getPhotoTransformOptions('desktop')};
  }

  @media screen and (max-width: 80rem) {
    ${DiamondBlock} {
      ${getWrapperTransformOptions('tablet')};
    }
    ${DiamondSkewReset} {
      ${getResetTransformOptions('tablet')};
    }
    ${DiamondPhoto} {
      ${getPhotoTransformOptions('tablet')};
    }
  }

  @media screen and (max-width: 62rem) {
    ${DiamondBlock} {
      ${getWrapperTransformOptions('landscape')};
    }
    ${DiamondSkewReset} {
      ${getResetTransformOptions('landscape')};
    }
    ${DiamondPhoto} {
      ${getPhotoTransformOptions('landscape')};
    }
  }

  @media screen and (max-width: 40rem) {
    ${DiamondBlock} {
      ${getWrapperTransformOptions('mobile')};
    }
    ${DiamondSkewReset} {
      ${getResetTransformOptions('mobile')};
    }
    ${DiamondPhoto} {
      ${getPhotoTransformOptions('mobile')};
    }
  }
`

let SpeakerPhoto = styled(DiamondPhoto)`
  width: 150%;
  height: 150%;
`

let Diamond = ({
  backSrc,
  backPosition,
  color,
  hasShadow,
  children,
  turningPoints = { desktop: 'left' },
}) => (
  <DiamondWrapper turningPoints={turningPoints}>
    {(() => {
      if (backSrc && !hasShadow) {
        return (
          <DiamondWithPhoto cover={color}>
            <DiamondPhoto src={backSrc} position={backPosition} />
            <DiamondSkewReset>{children}</DiamondSkewReset>
          </DiamondWithPhoto>
        )
      }
      if (hasShadow) {
        return (
          <DiamondWithShadow color={color}>
            <SpeakerPhoto src={backSrc} position={backPosition} />
          </DiamondWithShadow>
        )
      }
      return (
        <DiamondBlock style={{ backgroundColor: color }}>
          <DiamondSkewReset>{children}</DiamondSkewReset>
        </DiamondBlock>
      )
    })()}
    <DiamondPadder />
  </DiamondWrapper>
)

export default Diamond
