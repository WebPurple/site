import * as React from 'react';
import styled from 'styled-components';

const Angle = '30deg';
const Width = 32;
const Height = Width + 5;
const ShiftPhoto = Height / 2;

const EmptyDiamond = styled.div`
    width: ${(props) => props.size || Width}rem; 
    height: ${(props) => props.size + 5 || Height}rem; 
`;

const DiamondLeft = styled.div`
    transform: skewY(-${(props) => props.angle || Angle});

    width: ${(props) => props.size || Width}rem;
    height: ${(props) => props.size + 5 || Height}rem;
    overflow: hidden;
    color: white;
`;

const DiamondLeftDescription = styled.div`
    transform: skewY(${(props) => props.angle || Angle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondLeftWithPhoto = styled.div`
    transform: skewY(-${(props) => props.angle || Angle});
    width: ${(props) => props.size || Width}rem;
    height: ${(props) => props.size + 5 || Height}rem;
    overflow: hidden;
    color: white;
    
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

const DiamondLeftPhoto = styled.div`
    transform: skewY(${(props) => props.angle || Angle});
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const DiamondRight = styled.div`
    transform: skewY(${(props) => props.angle || Angle});
    
    width: ${(props) => props.size || Width}rem;
    height: ${(props) => props.size + 5 || Height}rem;
    overflow: hidden;
    color: white;
`;

const DiamondRightDescription = styled.div`
    transform: skewY(-${(props) => props.angle || Angle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondRightWithPhoto = styled.div`
    transform: skewY(${(props) => props.angle || Angle});
    
    width: ${(props) => props.size || Width}rem;
    height: ${(props) => props.size + 5 || Height}rem;
    overflow: hidden;
    color: white;

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

const DiamondRightPhoto = styled.div`
    transform: skewY(-${(props) => props.angle || Angle}) translateY(-${ShiftPhoto}rem);
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const Diamond = ({ isEmpty, angle, size, isTurnLeft, photoSrc, photoPosition, color, text,  hasShadow }) => (
    isEmpty && (
        <EmptyDiamond size={size} />
    ) ||
    isTurnLeft && !photoSrc && !hasShadow && (
        <DiamondLeft angle={angle} size={size} style={{ backgroundColor: color }}>
            {text && (
                <DiamondLeftDescription angle={angle}>{text}</DiamondLeftDescription>
            )}
        </DiamondLeft>
    ) ||
    isTurnLeft && photoSrc && !hasShadow && (
        <DiamondLeftWithPhoto angle={angle} size={size} cover={color}>
            <DiamondLeftPhoto angle={angle} src={photoSrc} position={photoPosition} />
            {text && (
                <DiamondLeftDescription angle={angle}>{text}</DiamondLeftDescription>
            )}
        </DiamondLeftWithPhoto>
    ) ||
    !isTurnLeft && !photoSrc && !hasShadow && (
        <DiamondRight angle={angle} size={size} style={{ backgroundColor: color }}>
            {text && (
                <DiamondRightDescription angle={angle}>{text}</DiamondRightDescription>
            )}
        </DiamondRight>
    ) ||
    !isTurnLeft && photoSrc && !hasShadow && (
        <DiamondRightWithPhoto angle={angle} size={size} cover={color}>
            <DiamondRightPhoto angle={angle} src={photoSrc} position={photoPosition} />
            {text && (
                <DiamondRightDescription angle={angle}>{text}</DiamondRightDescription>
            )}
        </DiamondRightWithPhoto>
    )
);

export default Diamond;
