import React from 'react';
import styled, {withTheme} from 'styled-components';

import Popup from '../common/popup';
import SpeakerContacts from '../common/speaker-contacts';
import Talk from './talk';
import Avatar from '../common/avatar';

const SpeakerDetailsContainer = styled.div`
`;

const PersonalInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LinksContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 21px;
`;

const SocialLinks = styled.div`
    min-width: 153px;
    margin-right: 5%;
`;

const TalksContainer = styled.ul`
  width: 82.5%;
  list-style: none;
  padding: 0;
`;

const Photo = styled.div`
    background-color: #c789fe;
    min-width: 153px;
    height: 260px;
    margin-right: 5%;
`;

const PersonalInfoTextContainer = styled.div`
    width: 82.5%;
`;

const Name = styled.div`
    font-family: Rubik;
    font-size: 32px;
    line-height: 36px;
    color: #e62270;
    font-weight: 500;
    margin-bottom: 24px;
`;

const Rank = styled.div`
    font-family: Oxygen;
    font-size: 18px;
    line-height: 18px;
    color: #432867;
    margin-bottom: 24px;
`;

const Description = styled.div`
    font-family: Oxygen;
    font-size: 18px;
    line-height: 27px;
    color: #545454;
`;

const SpeakerModal = ({onRequestClose, isOpen}) =>
    <Popup isOpen={isOpen} contentLabel="Speaker Info" onRequestClose={onRequestClose}
           width={1000}>

        <SpeakerDetailsContainer>
            <PersonalInfoContainer>
                <Avatar />

                <PersonalInfoTextContainer>
                    <Name> Chad Fitzgerald </Name>
                    <Rank> Senior Javascript Developer, EvilDinamics </Rank>
                    <Description>
                        Rack mount LCD monitors can save you a lot of space and help you form a convenient
                        and efficient desktop for your work or home study. The rack mount is set up so that
                        the keyboard and LCD monitor are on a sliding rack that lest you move them out from
                        your desk or over it. Once you decide to invest in the rack mount LCD monitor,
                        you will have to install the rack and the monitor. Here, then, are steps in
                        installing rack mount LCD monitors.
                    </Description>
                </PersonalInfoTextContainer>
            </PersonalInfoContainer>

            <LinksContainer>
                <SocialLinks>
                    <SpeakerContacts/>
                </SocialLinks>
                <TalksContainer>
                    <Talk title={'Do Responsive Sites Have to Be So Tall on Mobile?'}/>
                </TalksContainer>
            </LinksContainer>
        </SpeakerDetailsContainer>
    </Popup>

export default SpeakerModal;