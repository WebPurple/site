import * as React from 'react';
import styled from 'styled-components';

const defaultAngle = 30;
const sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI);
const width = 32;
const height = width / sinusAngle;
const shiftPhoto = height / 2;

const EmptyDiamond = styled.div`
    width: ${(props) => props.size || width}rem; 
    height: ${(props) => props.size / sinusAngle || height}rem; 
`;

const DiamondBlock = styled(EmptyDiamond)`
    transform: skewY(${props => props.isTurnLeft ? -defaultAngle : defaultAngle}deg);
    overflow: hidden;
    color: white;
`;

const DiamondWithPhoto = styled(DiamondBlock)`
    position: relative;
    
    &:after {
        opacity: 0.7;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        width: 100%;
        background-color: ${(props) => props.cover};
    }
`;

const DiamondPhoto = styled.div`
    transform: ${props => props.isTurnLeft
        ? 'skewY(' + defaultAngle + 'deg)'
        : 'skewY(' + -defaultAngle + 'deg) translateY(' + -shiftPhoto + 'rem)'};
    
    position: absolute;
    top: 0;
        
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const DiamondWithShadow = styled(DiamondWithPhoto)`
    box-shadow: 1.2rem 1.4rem ${(props) => props.color}
`;

const SpeakerPhoto = styled(DiamondPhoto)`
    width: 150%;
    height: 150%;
`;

const Diamond = ({ isEmpty, size, isTurnLeft, backSrc, backPosition, color, hasShadow, children }) => (
    isEmpty && (
        <EmptyDiamond size={size} />
    ) ||
    !backSrc && !hasShadow && (
        <DiamondBlock size={size} isTurnLeft={isTurnLeft} style={{ backgroundColor: color }}>
            {children}
        </DiamondBlock>
    ) ||
    backSrc && !hasShadow && (
        <DiamondWithPhoto size={size} isTurnLeft={isTurnLeft} cover={color}>
            <DiamondPhoto isTurnLeft={isTurnLeft} src={backSrc} position={backPosition} />
            {children}
        </DiamondWithPhoto>
    ) ||
    hasShadow && (
        <DiamondWithShadow size={size} isTurnLeft={isTurnLeft} color={color}>
            <SpeakerPhoto isTurnLeft={isTurnLeft} src={backSrc} position={backPosition} />
        </DiamondWithShadow>
    )
);

export default Diamond;
