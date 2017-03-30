import React from 'react';

import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import SpeakerContacts from '../common/speaker-contacts';
import Avatar from '../common/avatar';

const Card = styled.div`
    display: flex;
    padding: 3.5rem 0;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    ${media.phone`
        width: 50%;
        flex-direction: row; 
        align-items: flex-start;
    `}
`;

const SpeakerAvatarContainer = styled.div`
    width: 12rem;
    height: 20rem;
    padding-bottom: 2rem;
    ${media.phone`padding-bottom: 0;`}
`;

const SpeakerInfoContainer = styled.div`
    text-align: center;
    ${media.phone`
        text-align: left;
        padding-left: 3.5rem;
    `}
`;

const speakerLinkHover = (color) => `
    position: relative;
    display: inline-block;
    
    &:hover {
        color: ${color}; 
    }
    
    &:after {
        width: 0;
        height: 0.2rem;
        display: block;
        position: absolute;
        left: 50%;
        content: '';
        background: ${color};
        transition: all 0.2s ease-in-out;
    }

    &:hover:after {
        left: 0;
        width: 100%;
    }
`;

const SpeakerInitials = styled.a`
    margin: 0;
    text-decoration: none;
    font-family: Rubik;
    font-size: 3.2rem;
    font-weight: bold;
    line-height: 1.13;
    color: ${props => props.theme.greyishBrown};
    ${props => speakerLinkHover(props.theme.greyishBrown)}
`;

const SpeakerDescription = styled.p`
    margin: 0;
    padding-top: 1rem;
    padding-bottom: 2.5rem;
    font-family: Oxygen, 'sans-serif';
    font-size: 2.2rem;
    color: ${props => props.theme.grape};
`;

const SpeakerAdditionalContainer = styled.div`
    display: flex;
    justify-content: center;
    ${media.phone`justify-content: flex-start;`}
`;

const CountOFTalks = styled.a`
    margin-left: 1.5rem;
    text-decoration: none;
    font-family: Oxygen, 'sans-serif';
    font-size: 2.2rem;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    ${props => speakerLinkHover(props.theme.lipstick)}
`;

const SpeakerCard = ({ avatar, speaker }) => (
    <Card>
        <SpeakerAvatarContainer>
            <Avatar avatar={avatar} />
        </SpeakerAvatarContainer>
        <SpeakerInfoContainer>
            <SpeakerInitials href="#">{speaker.initials}</SpeakerInitials>
            <SpeakerDescription>{speaker.description}</SpeakerDescription>
            <SpeakerAdditionalContainer>
                <SpeakerContacts />
                <CountOFTalks href="#">{speaker.talksCount} talks</CountOFTalks>
            </SpeakerAdditionalContainer>
        </SpeakerInfoContainer>
    </Card>
);

export default SpeakerCard;
