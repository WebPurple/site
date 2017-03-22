import * as React from 'react';
import styled from 'styled-components';

const DiamondAngle = '26deg';
const DiamondSize = 15.7;
const DiamondBackShift = DiamondSize / 2;

/* how to pass size properly? */
const EmptyDiamond = styled.div`
    width: ${(props) => props.size || DiamondSize}rem; 
    height: ${(props) => props.size || DiamondSize}rem;
`;

const DiamondLeft = styled.div`
    width: ${DiamondSize}rem;
    height: ${DiamondSize}rem;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(-${DiamondAngle});
`;

const DiamondLeftDescription = styled.div`
    transform: skewY(${DiamondAngle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondLeftWithPhoto = styled.div`
    width: ${DiamondSize}rem;
    height: ${DiamondSize}rem;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(-${DiamondAngle});
    
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
    transform: skewY(${DiamondAngle});
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const DiamondRight = styled.div`
    width: ${DiamondSize}rem;
    height: ${DiamondSize}rem;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(${DiamondAngle});
`;

const DiamondRightDescription = styled.div`
    transform: skewY(-${DiamondAngle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondRightWithPhoto = styled.div`
    width: ${DiamondSize}rem;
    height: ${DiamondSize}rem;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(${DiamondAngle});
    
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
    transform: skewY(-${DiamondAngle}) translateY(-${DiamondBackShift}rem);
    
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
        <DiamondLeft style={{ backgroundColor: color }}>
            {text && (
                <DiamondLeftDescription>{text}</DiamondLeftDescription>
            )}
        </DiamondLeft>
    ) ||
    isTurnLeft && photoSrc && !hasShadow && (
        <DiamondLeftWithPhoto cover={color}>
            <DiamondLeftPhoto src={photoSrc} position={photoPosition} />
            {text && (
                <DiamondLeftDescription>{text}</DiamondLeftDescription>
            )}
        </DiamondLeftWithPhoto>
    ) ||
    !isTurnLeft && !photoSrc && !hasShadow && (
        <DiamondRight style={{ backgroundColor: color }}>
            {text && (
                <DiamondRightDescription>{text}</DiamondRightDescription>
            )}
        </DiamondRight>
    ) ||
    !isTurnLeft && photoSrc && !hasShadow && (
        <DiamondRightWithPhoto cover={color}>
            <DiamondRightPhoto src={photoSrc} position={photoPosition} />
            {text && (
                <DiamondRightDescription>{text}</DiamondRightDescription>
            )}
        </DiamondRightWithPhoto>
    )

);

export default Diamond;
