import * as React from 'react';
import styled from 'styled-components';

const defaultAngle = 30;
const sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI);
const width = 32;
const height = width / sinusAngle;

/* descriptionTop for the defaultAngle 30 */
const descriptionTop = height / 4;

const shiftPhoto = height / 2;

const EmptyDiamond = styled.div`
    width: ${(props) => props.size || width}rem; 
    height: ${(props) => props.size / sinusAngle || height}rem; 
`;

const DiamondLeft = styled.div`
    transform: skewY(-${defaultAngle}deg);

    width: ${(props) => props.size || width}rem;
    height: ${(props) => props.size / sinusAngle || height}rem;
    overflow: hidden;
    color: white;
`;

const DiamondLeftWithPhoto = styled.div`
    transform: skewY(-${defaultAngle}deg);
    width: ${(props) => props.size || width}rem;
    height: ${(props) => props.size / sinusAngle || height}rem;
    overflow: hidden;
    color: white;
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

const DiamondLeftPhoto = styled.div`
    transform: skewY(${defaultAngle}deg);
    
    position: absolute;
    top: 0;
        
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const DiamondRight = styled.div`
    transform: skewY(${defaultAngle}deg);
    
    width: ${(props) => props.size || width}rem;
    height: ${(props) => props.size / sinusAngle || height}rem;
    overflow: hidden;
    color: white;
`;

const DiamondRightDescription = styled.div`
    transform: skewY(-${defaultAngle}deg);
    
    font-family: 'Rubik', sans-serif;
    padding: 0 3rem;
    color: white;
    position: relative;
    top: ${descriptionTop}rem;
    z-index: 1;
`;

const DiamondLeftDescription = styled.div`
    transform: skewY(${defaultAngle}deg);
    
    font-family: 'Rubik', sans-serif;
    padding: 0 3rem;
    color: white;
    position: relative;
    top: ${descriptionTop}rem;
    z-index: 1;
`;

const DiamondRightWithPhoto = styled.div`
    transform: skewY(${defaultAngle}deg);
    
    width: ${(props) => props.size || width}rem;
    height: ${(props) => props.size / sinusAngle || height}rem;
    overflow: hidden;
    color: white;
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

const DiamondRightPhoto = styled.div`
    transform: skewY(-${defaultAngle}deg) translateY(-${shiftPhoto}rem);
    
    position: absolute;
    top: 0;
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const Header = styled.div`
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: bold;
`;

const Title = styled.div`
    font-size: 2.8rem;
    font-weight: bold;
    margin: 1.8rem 0;
    
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    max-height: 9.5rem;
`;

const Speaker = styled.div`
    display: flex;
    align-items: center;
`;

const SpeakerPhoto = styled.div`
   background-image: url(${(props) => props.src});
   width: 4rem;
   height: 4rem;
   border-radius: 50%;
`;

const SpeakerName = styled.div`
    padding-left: 1.8rem;
    font-size: 1.8rem;
    font-family: 'Oxygen', sans-serif;
`;


const Diamond = ({ isEmpty, size, isTurnLeft, backSrc, backPosition, color, header, text, speakerPhoto, speakerName, hasShadow }) => (
    isEmpty && (
        <EmptyDiamond size={size} />
    ) ||
    isTurnLeft && !backSrc && !hasShadow && (
        <DiamondLeft size={size} style={{ backgroundColor: color }}>
            {text && (
                <DiamondLeftDescription>
                    <Header>{header}</Header>
                    <Title>{text}</Title>
                    <Speaker>
                        <SpeakerPhoto src={speakerPhoto} />
                        <SpeakerName>{speakerName}</SpeakerName>
                    </Speaker>
                </DiamondLeftDescription>
            )}
        </DiamondLeft>
    ) ||
    isTurnLeft && backSrc && !hasShadow && (
        <DiamondLeftWithPhoto size={size} cover={color}>
            {text && (
                <DiamondLeftDescription>
                    <Header>{header}</Header>
                    <Title>{text}</Title>
                    <Speaker>
                        <SpeakerPhoto src={speakerPhoto} />
                        <SpeakerName>{speakerName}</SpeakerName>
                    </Speaker>
                </DiamondLeftDescription>
            )}
            <DiamondLeftPhoto src={backSrc} position={backPosition} />
        </DiamondLeftWithPhoto>
    ) ||
    !isTurnLeft && !backSrc && !hasShadow && (
        <DiamondRight size={size} style={{ backgroundColor: color }}>
            {text && (
                <DiamondRightDescription>
                    <Header>{header}</Header>
                    <Title>{text}</Title>
                    <Speaker>
                        <SpeakerPhoto src={speakerPhoto} />
                        <SpeakerName>{speakerName}</SpeakerName>
                    </Speaker>
                </DiamondRightDescription>
            )}
        </DiamondRight>
    ) ||
    !isTurnLeft && backSrc && !hasShadow && (
        <DiamondRightWithPhoto size={size} cover={color}>
            {text && (
                <DiamondRightDescription>
                    <Header>{header}</Header>
                    <Title>{text}</Title>
                    <Speaker>
                        <SpeakerPhoto src={speakerPhoto} />
                        <SpeakerName>{speakerName}</SpeakerName>
                    </Speaker>
                </DiamondRightDescription>
            )}
            <DiamondRightPhoto src={backSrc} position={backPosition} />
        </DiamondRightWithPhoto>
    )
);

export default Diamond;
