import React from 'react';

import styled from 'styled-components';

// import { media } from '../../utils/css-utils';
import SpeakerContacts from '../common/speaker-contacts';

const Card = styled.div`
    width: 50%;
    display: flex;
`;

const SpeakerAvatarContainer = styled.div`
    width: 122px;
    height: 206px;
`;

const avatarForm = styled.div`
    width: 110px;
    height: 120px;
    transform-origin: right top;
    transform: skewY(-26deg);
    -ms-transform: skewY(-26deg);
    -webkit-transform: skewY(-26deg);
`;

const SpeakerAvatar = styled(avatarForm)`
    background-color: rgba(143, 18, 254, 0.5);
    
    &:after {
        width: 110px;
        height: 120px;  
        display: block;
        content: '';
        position: relative;
        top: 8px;
        left: 8px;
        background-color: rgba(230, 33, 112, 0.5);
    }
`;

const SpeakerInfoContainer = styled.div`
    padding-left: 2em;
`;

const SpeakerInitials = styled.a`
    font-family: Rubik;
    font-size: 32px;
    font-weight: 500;
    font-stretch: normal;
    line-height: 1.13;
    letter-spacing: normal;
    color: #545454;
    margin: 0;
    text-decoration: none;
`;

const SpeakerDescription = styled.p`
    font-family: LucidaGrande;
    font-size: 22px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2em;
    letter-spacing: normal;
    color: #432867;
    margin: 0;
`;

const SpeakerAdditionalContainer = styled.div`
    display: flex;
`;

const CountOFTalks = styled.div`
    font-family: Oxygen;
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
    color: #dd005d;
`;


const SpeakerCard = () => (
    <Card>
        <SpeakerAvatarContainer>
            <SpeakerAvatar />
        </SpeakerAvatarContainer>
        <SpeakerInfoContainer>
            <SpeakerInitials href="#">Speaker name</SpeakerInitials>
            <SpeakerDescription>Freelancer</SpeakerDescription>
            <SpeakerAdditionalContainer>
                <SpeakerContacts />
                <CountOFTalks>7 talks</CountOFTalks>
            </SpeakerAdditionalContainer>
        </SpeakerInfoContainer>
    </Card>
);

export default SpeakerCard;
