import React, { PropTypes } from 'react';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';

import { media, isPhone, isTablet } from '../../utils/css-utils';

import ClockIcon from '../icons/clock-icon';
import LocationIcon from '../icons/placeholder-icon';
import ArrowButton from '../arrow-button/arrow-button';
import Diamond from '../diamond';

const DIAMOND_DESKTOP_SIZE = 11;
const DIAMOND_TABLET_SIZE = 9;
const DIAMOND_PHONE_SIZE = 7;

const Wrapper = styled.div`
    margin-top: 0;
    padding: 0 2rem;
    ${media.tablet`
        padding: 0 10rem;
        margin-top: 0rem;
    `}
`;

const Header = styled.h4`
    font-family: 'Oxygen', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.warmGrey};
    margin-bottom: 0;
    ${media.tablet`
        font-size: 2.1rem;
    `}
`;

const EventBlock = styled.div`
    margin-top: 2rem;  
`;

const EventTitle = styled.h1`
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.lipstick};
    ${media.tablet`
        font-size: 4.8rem;
    `}
    ${media.desktop`
        font-size: 5.8rem;
        letter-spacing: 0.3rem;
    `}
`;

const EventInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const EventInfoRow = styled.div`
    margin-bottom: 1rem;
    ${media.tablet`
        margin-bottom: 2rem;
    `}
`;

const EventText = styled.span`
    vertical-align: top;
    font-family: 'Oxygen', sans-serif;
    font-size: 1.8rem;
    line-height: 1.9rem;
    font-weight: 700;
    color: ${props => props.theme.greyishBrown};
    margin-left: 1.4rem;
    ${media.tablet`
        font-size: 2rem;
        line-height: 2rem;
        letter-spacing: 0.1rem;
    `}
`;

const TalksBlock = styled.ul`
    top: 5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    ${media.tablet`
        top: 2rem;
        position: relative;
        align-items: flex-end;
    `}
    ${media.desktop`
        top: -2.5rem;
        position: relative;
        align-items: flex-end;
    `}
`;

const TalkInfo = styled.li`
    position: relative;
    &:first-child {
        margin-left: ${DIAMOND_PHONE_SIZE}rem;
    }
    &:nth-child(2) {
        margin-left: ${DIAMOND_PHONE_SIZE + 7}rem;
        margin-top: 4rem;
    };
    ${media.tablet`
        max-width: 30%;
        &:nth-child(2) {
            margin-left: ${DIAMOND_TABLET_SIZE + 7}rem;
        };
        &:first-child {
            margin-left: ${DIAMOND_TABLET_SIZE}rem;
            margin-right: 18rem;
            margin-bottom: 2rem;
        };
    `}
    ${media.desktop`
        max-width: 25%;
        &:nth-child(2) {
            margin-left: 0;
        };
        &:first-child {
            margin-right: 16rem;
            margin-bottom: 9rem;
        };
    `}
`;

const DiamondWrapper = styled.div`
    position: absolute;
    left: -${isPhone() ? DIAMOND_PHONE_SIZE : isTablet() ? DIAMOND_TABLET_SIZE : DIAMOND_DESKTOP_SIZE}rem;
`;

const TalkDataWrapper = styled.div`
    margin-left: 2rem;
`;

const TalkTitle = styled.h3`
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.greyishBrown};
    ${media.tablet`
        font-size: 3rem;  
    `}
`;

const TalkSpeaker = styled.div`
    font-family: 'Oxygen', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.grape};
`;

const Footer = styled.div`
    margin-top: 7rem;
    ${media.desktop`
        margin-top: 5rem;
    `}
`;

const UpcomingEvents = withTheme(({ theme, event }) => {
    const DIAMOND_SIZE = isPhone() ? DIAMOND_PHONE_SIZE : isTablet() ? DIAMOND_TABLET_SIZE : DIAMOND_DESKTOP_SIZE;

    return (
        <Wrapper>
            <Header>Upcoming event</Header>
            <EventTitle>{event.title}</EventTitle>
            <EventBlock>
                <EventInfo>
                    <EventInfoRow>
                        <LocationIcon color={theme.lipstick} opaque />
                        <EventText>{event.location}</EventText>
                    </EventInfoRow>
                    <EventInfoRow>
                        <ClockIcon color={theme.lipstick} opaque />
                        <EventText>{moment(event.date).format('LLL')}</EventText>
                    </EventInfoRow>
                </EventInfo>
                <TalksBlock>
                    {event.talks.map((talk, i) => (
                        <TalkInfo key={talk.title}>
                            <DiamondWrapper>
                                <Diamond
                                    color={i % 2 ? theme.rouge : theme.grape}
                                    backSrc={talk.speaker.vkPhotoUrl}
                                    isTurnLeft size={DIAMOND_SIZE} />
                            </DiamondWrapper>
                            <TalkDataWrapper>
                                <TalkTitle>{talk.title}</TalkTitle>
                                <TalkSpeaker>{talk.speaker.displayName}</TalkSpeaker>
                            </TalkDataWrapper>
                        </TalkInfo>
                    ))}
                </TalksBlock>
            </EventBlock>
            <Footer>
                <ArrowButton>See details</ArrowButton>
            </Footer>
        </Wrapper>
    );
});

UpcomingEvents.propTypes = {
    event: PropTypes.shape({
        location: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        talks: PropTypes.array.isRequired,
    }),
};

export default UpcomingEvents;
