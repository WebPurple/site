import React from 'react';

import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import SpeakerContacts from '../common/speaker-contacts';
import { default as NoAvatarIcon } from '../icons/no-avatar-icon';

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

const AvatarContainerHeight = `
    height: 20rem;
`;

const SpeakerAvatarContainer = styled.div`
    width: 12rem;
    padding-bottom: 2rem;
    ${AvatarContainerHeight}
    ${media.phone`padding-bottom: 0;`}
`;

const avatarFormSize = `
    width: 11rem;
    height: 13rem;
`;

const avatarForm = styled.div`
    ${avatarFormSize}
    transform-origin: right top;

    transform: skewY(-30deg);
    -ms-transform: skewY(-30deg);
    -webkit-transform: skewY(-30deg);
`;

const SpeakerAvatar = styled(avatarForm)`
    overflow: hidden;
    position: relative;
    box-shadow: 1.2rem 1.4rem rgba(230, 33, 112, 0.5);
`;

const Avatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${AvatarContainerHeight}
    
    background: #efefef ${props => props.avatar ? `url(${props.avatar})` : ''} center top no-repeat;
    background-size: auto 100%;
    
    transform: skewY(30deg) translateY(-3.2rem);
    -ms-transform: skewY(30deg) translateY(-3.2rem);
    -webkit-transform: skewY(30deg) translateY(-3.2rem);
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
    font-family: Oxygen;
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
    font-family: Oxygen;
    font-size: 2.2rem;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    ${props => speakerLinkHover(props.theme.lipstick)}
`;


const SpeakerCard = (avatar) => (
    <Card>
        <SpeakerAvatarContainer>
            <SpeakerAvatar>
                <Avatar>
                    {avatar ? <NoAvatarIcon /> : ''}
                </Avatar>
            </SpeakerAvatar>
        </SpeakerAvatarContainer>
        <SpeakerInfoContainer>
            <SpeakerInitials href="#">Christopher Douglas</SpeakerInitials>
            <SpeakerDescription>Freelancer, Javascript developer, Senior Front-end developer</SpeakerDescription>
            <SpeakerAdditionalContainer>
                <SpeakerContacts />
                <CountOFTalks href="#">7 talks</CountOFTalks>
            </SpeakerAdditionalContainer>
        </SpeakerInfoContainer>
    </Card>
);

export default SpeakerCard;
