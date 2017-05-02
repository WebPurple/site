import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { media } from '../../utils/css-utils';

import EventBG from './event-background';
import BlockHeader from '../common/block-header';
import { TagList } from '../common/tag';
import Attendees from './attendees';
import SocialLinks from './social-links';
import EventTalks from './talks/talks';
import ImageList from './../image-list/image-list';
import { PlaceholderIcon, ClockIcon } from './../icons';
import EventMap from './event-map';

const TagListWrapper = styled.div`
    margin-top: 6rem;
`;

const EventTitle = styled.h1`
    font-family: Rubik, sans-serif;
    font-weight: 500;
    line-height: 1;
    color: ${props => props.theme.lipstick};
    font-size: 2.6rem;
    ${media.phone`
        font-size: 3.6rem;
    `}
    ${media.tablet`
        font-size: 6.2rem;
    `}
    ${media.desktop`
        font-size: 7.8rem;
    `}
`;

const BodyGrid = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: space-betweeen;
    flex-flow: column-reverse wrap;

    ${media.desktop`
        flex-direction: row;
    `}
`;

const Description = styled.div`
    width: 100%;
    font-family: Oxygen, sans-serif;
    font-size: 2.4rem;
    line-height: 1.5;
    color: ${props => props.theme.greyishBrown};
    font-size: 1.6rem;
    line-height: 1.5;
    ${media.tablet`
        font-size: 2.4rem;
    `}
    ${media.desktop`
        width: 63.2rem;
    `}
    ${media.hd`
        width: 71.4rem;
    `}
`;

const InfoGrid = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    ${media.phone`
        flex-direction: row;
        justify-content: space-between;
    `}
    ${media.desktop`
        width: 38.2rem;
        flex-direction: column;
        justify-content: flex-start;
        width: 56rem;
    `}
`;

const InfoText = styled.div`
    margin-bottom: 2.5rem;
    font-family: Oxygen, sans-serif;
    font-weight: bold;
    color: ${props => props.theme.greyishBrown};
    font-size: 1.6rem;
    line-height: 1;
    ${media.tablet`
        font-size: 2.4rem;
        line-height: 1.17;
    `}
`;

const IconStyleMixin = `
    width: 2rem;
    height: 2rem;
    vertical-align: top;
    margin-right: 1.3rem;
`;

const PlaceholderIconStyled = styled(PlaceholderIcon)`
    ${IconStyleMixin}

    ${media.phone`
        margin-right: 1.2rem;
    `}
    ${media.tablet`
        margin-right: 1.6rem;
        width: 2.8rem;
        height: 2.8rem;
    `}

    & path {
        fill: ${props => props.theme.lipstick};
        opacity: 1;
    }
`;

const ClockIconStyled = styled(ClockIcon)`
    ${IconStyleMixin}

    ${media.phone`
        margin-right: 1.2rem;
    `}
    ${media.tablet`
        margin-right: 1.6rem;
        width: 2.8rem;
        height: 2.8rem;
    `}

    & path {
        fill: ${props => props.theme.lipstick};
        opacity: 1;
    }
`;

const IllBeThereBlockWrapper = styled.div`
    text-align: center;
    width: 100%;
    ${media.phone`
        text-align: left;
    `}
`;

const IllBeThereNoLoggedInBlock = styled.span`
    position: relative;
    font-family: Rubik, sans-serif;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 1;
    color: ${props => props.theme.lipstick};
`;

const IllBeThereBlock = styled(IllBeThereNoLoggedInBlock)`
    cursor: pointer;

    &:before {
        content: "";
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        border: .1rem solid ${props => props.theme.lipstick};
        margin-right: 1.2rem;
        font-size: 3rem;
        vertical-align: baseline;
        line-height: 2.4rem;
        font-weight: 900;
    }

    &:after {
        content: '🗸';
        display: ${props => props.checked ? 'block' : 'none'};
        font-size: 2rem;
        font-weight: 900;
        position: absolute;
        top: .6rem;
        left: 0;
    }
`;

const AttendeesText = styled.div`
    width: 100%;
    margin-top: 2.4rem;
    text-align: center;
    font-family: Oxygen, sans-serif;
    font-size: 1.6rem;
    line-height: 1.13;
    color: #424242;
    ${media.phone`
        text-align: left;
    `}
    ${media.tablet`
        font-size: 1.8rem;
    `}
`;

const BodyFooter = styled.div`
    margin-top: 3.6rem;
    margin-bottom: 6rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-start;

    ${media.tablet`
        margin-top: 6.4rem;    
        margin-bottom: 9.6rem;
    `}
`;

const LastLine = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.2rem;

    ${media.phone`
        flex-direction: row;
    `}
`;

const SocialIconsWrapper = styled.span`
    margin-top: 3.6rem;

    ${media.phone`
        margin-top: 0;    
    `}
`;

const ImageListWapper = styled.div`
    margin-top: 3.6rem;
    margin-bottom: 6rem;

    ${media.tablet`
        margin-top: 6.4rem;
        margin-bottom: 9.6rem;
    `}
`;

const MapWrapper = styled.div`
    height: 50rem;
    margin-top: 3.6rem;
    margin-bottom: 6rem;

    ${media.tablet`
        margin-top: 6.4rem;
        margin-bottom: 9.6rem;
    `}
`;

const EventPage = ({ event, attendees, currentUser, becomeAttendee, stopBeingAttendee, images }) => {
    const isAttendee = (attendees && currentUser && attendees.some(attendee => attendee._id === currentUser._id));

    return (
        <div>
            <EventBG image={event.image} />
            <TagListWrapper><TagList tags={event.tags} /></TagListWrapper>
            <EventTitle>{event.title}</EventTitle>
            <BodyGrid>
                <Description>{event.description}</Description>
                <InfoGrid>
                    <InfoText><PlaceholderIconStyled />{event.location}</InfoText>
                    <InfoText><ClockIconStyled />{moment(event.date).format('D MMMM YYYY [at] HH:mm')}</InfoText>
                </InfoGrid>
            </BodyGrid>
            <BodyFooter>
                <IllBeThereBlockWrapper>
                    { currentUser ?
                        <IllBeThereBlock
                            checked={isAttendee}
                            onClick={() => isAttendee ? stopBeingAttendee(event) : becomeAttendee(event)}>
                            {'I\'ll be there'}
                        </IllBeThereBlock> :
                        <IllBeThereNoLoggedInBlock>Sign in to be able to become attendee</IllBeThereNoLoggedInBlock>
                    }
                </IllBeThereBlockWrapper>
                <AttendeesText>{attendees.length ? 'You will attend along with' : 'Become first attendee'}</AttendeesText>
                <LastLine>
                    <Attendees users={attendees} />
                    <SocialIconsWrapper>
                        <SocialLinks />
                    </SocialIconsWrapper>
                </LastLine>
            </BodyFooter>
            {
                event.talks.length === 0 ?
                    null :
                    <div>
                        <BlockHeader>Speakers</BlockHeader>
                        <EventTalks talks={event.talks} />
                    </div>
            }
            {
                images.length === 0 ?
                    null :
                    <div>
                        <BlockHeader>Past event’s photo</BlockHeader>
                        <ImageListWapper><ImageList images={images} /></ImageListWapper>
                    </div>
            }
            {
                new Date(event.date) < new Date() ?
                    null :
                    <div>
                        <BlockHeader>Location</BlockHeader>
                        <MapWrapper>
                            <EventMap location={event.location} />
                        </MapWrapper>
                    </div>
            }
        </div>
    );
};

EventPage.propTypes = {
    event: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    attendees: React.PropTypes.arrayOf(React.PropTypes.object),
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    becomeAttendee: React.PropTypes.func.isRequired,
    stopBeingAttendee: React.PropTypes.func.isRequired,
};

export default EventPage;
