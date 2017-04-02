import React from 'react';
import styled, { withTheme } from 'styled-components';

import ClockIcon from '../icons/clock-icon';
import LocationIcon from '../icons/placeholder-icon';

import ArrowButton from '../arrow-button/arrow-button';

const Wrapper = styled.div`
    margin-top: 4rem;
`;

const Header = styled.h4`
    font-family: Oxygen;
    font-size: 2.1rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.warmGrey};
    margin-bottom: 0;
`;

const EventBlock = styled.div`
    margin-top: 2rem;  
`;

const EventTitle = styled.h1`
    margin: 0;
    font-family: Rubik;
    font-size: 5.8rem;
    font-weight: 700;
    color: ${props => props.theme.lipstick}
    letter-spacing: 0.3rem;
`;

const EventInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const EventInfoRow = styled.div`
    margin-bottom: 2rem;
`;

const EventText = styled.span`
    vertical-align: top;
    font-family: Oxygen;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 700;
    color: ${props => props.theme.greyishBrown};
    margin-left: 1.4rem;
    letter-spacing: 0.1rem;
`;

const TalksBlock = styled.div`
    position: relative;
    top: -2.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TalkInfo = styled.div`
    &:first-child {
        margin-right: 20rem;
        margin-bottom: 5rem;
    }
    max-width: 25%;
`;

const TalkTitle = styled.h3`
    margin: 0;
    font-family: Rubik;
    font-size: 3rem;
    font-weight: 700;
    color: ${props => props.theme.greyishBrown};
`;

const TalkSpeaker = styled.div`
    font-family: Oxygen;
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.grape};
`;

const Footer = styled.div`
    margin-top: 1rem;
`

const UpcomingEvents = withTheme(({ theme, event }) => (
    <Wrapper>
        <Header>Upcoming event</Header>
        <EventTitle>WebPurple Meetup #16</EventTitle>
        <EventBlock>
            <EventInfo>
                <EventInfoRow>
                    <LocationIcon color={theme.lipstick} opaque/>
                    <EventText>{event.location}</EventText>
                </EventInfoRow>
                <EventInfoRow>
                    <ClockIcon color={theme.lipstick} opaque/>
                    <EventText>{event.date}</EventText>
                </EventInfoRow>
            </EventInfo>
            <TalksBlock>
                <TalkInfo>
                    <TalkTitle>What is React Native</TalkTitle>
                    <TalkSpeaker>Andrey Semin</TalkSpeaker>
                </TalkInfo>
                <TalkInfo>
                    <TalkTitle>Level Up By Community Growth-Hacking</TalkTitle>
                    <TalkSpeaker>Lois Graham</TalkSpeaker>
                </TalkInfo>
            </TalksBlock>
        </EventBlock>
        <Footer>
            <ArrowButton>See details</ArrowButton>
        </Footer>
    </Wrapper>  
));

export default UpcomingEvents;