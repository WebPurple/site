import * as React from 'react';
import styled from 'styled-components';

const defaultAngle = 30;
const sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI);
const width = 32;
const height = width / sinusAngle;

/* descriptionTop for the defaultAngle 30 */
const descriptionTop = height / 4;

const DiamondDescription = styled.div`
    transform: skewY(${props => props.isTurnLeft ? defaultAngle : -defaultAngle}deg);
    
    font-family: 'Rubik', sans-serif;
    padding: 0 3rem;
    color: white;
    position: relative;
    top: ${descriptionTop}rem;
    z-index: 1;
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
    max-height: 10rem;
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


const EventDiamond = ({ isTurnLeft, header, text, speakerPhoto, speakerName }) => (
    (<DiamondDescription isTurnLeft={isTurnLeft}>
        <Header>{header}</Header>
        <Title>{text}</Title>
        <Speaker>
            <SpeakerPhoto src={speakerPhoto} />
            <SpeakerName>{speakerName}</SpeakerName>
        </Speaker>
    </DiamondDescription>)
);

export default EventDiamond;
