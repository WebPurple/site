// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grid-styled'
import moment from 'moment'

import { media, tColor } from '../../utils/css-utils'
import ClockIcon from '../icons/clock-icon'
import LocationIcon from '../icons/placeholder-icon'
import ArrowButton from '../arrow-button/arrow-button'
import Diamond, { calculateHeight } from '../diamond'
import EventBackground from '../event-page/event-background'
import { eventBigBackground } from '../../utils/selectors'

const DIAMOND_SIZES = {
  DESKTOP: 11,
  TABLET: 9,
  MOBILE: 6.5,
}

const Wrapper = styled.div`
  margin-top: 0;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'title'
    'info'
    'talks'
    'link';
  ${media.phone`
    grid-template-columns: max-content 1fr;
    grid-column-gap: 2rem;
    grid-template-areas:
      'header header'
      'title title'
      'info info'
      'link talks';
  `};
  ${media.desktop`
      padding: 0 10rem;
      margin-top: 0rem;
      grid-template-columns: 50rem 1fr;
      grid-template-areas:
        'header header'
        'title title'
        'info talks'
        'link talks';
  `};
`

const Header = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  grid-area: header;
  color: ${props => props.theme.warmGrey};
  margin-bottom: 0;
  ${media.tablet`
      font-size: 2.1rem;
  `};
`

const EventTitle = styled.h1`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  grid-area: title;
  margin-bottom: 2rem;
  color: ${props => props.theme.lipstick};
  ${media.tablet`
      font-size: 4.8rem;
  `};
  ${media.desktop`
      font-size: 5.8rem;
      letter-spacing: 0.3rem;
  `};
`

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: info;
`

const EventInfoRow = styled.div`
  margin-bottom: 1rem;
  ${media.tablet`
      margin-bottom: 2rem;
  `};
`

const EventText = styled.span`
  vertical-align: top;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 700;
  color: ${props => props.theme.greyishBrown};
  margin-left: 1.4rem;
  ${media.tablet`
      font-size: 2rem;
      line-height: 2rem;
      letter-spacing: 0.1rem;
  `};
`
const TalkInfo = styled.li`
  display: flex;
  align-items: center;
`

const TalksBlock = styled.ul`
  grid-area: talks;
  padding: 0;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${TalkInfo}:nth-child(odd) {
    align-self: flex-start;
    ${media.phone`
      align-self: flex-end;
      margin-right: 10rem;
    `};
    ${media.desktop`
      margin-right: 14rem;
    `};
  }
`

const TalkDataWrapper = styled.div`
  width: 16rem;
  ${media.phone`
    width: 20rem;
  `};
  ${media.desktop`
    width: 35rem;
  `};
`

const TalkTitle = styled.h3`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  color: ${props => props.theme.greyishBrown};
  ${media.phone`
    font-size: 2.2rem;
  `};
  ${media.desktop`
    font-size: 3rem;
    font-weight: 700;
  `};
`

const TalkSpeaker = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  color: ${tColor('grape')};
`

const ArrowLink = ArrowButton.withComponent(Link)

const ArrowLinkWrapper = styled.div`
  grid-area: link;
  display: flex;
  align-items: flex-end;
  margin-top: 1rem;
`

const DiamondOuterWrapper = styled.div`
  width: ${DIAMOND_SIZES.MOBILE}rem;
  height: ${calculateHeight(DIAMOND_SIZES.MOBILE)}rem;
  margin-right: 1rem;
  ${media.phone`
  width: ${DIAMOND_SIZES.TABLET}rem;
  height: ${calculateHeight(DIAMOND_SIZES.TABLET)}rem;
  `};
  ${media.desktop`
    width: ${DIAMOND_SIZES.DESKTOP}rem;
    height: ${calculateHeight(DIAMOND_SIZES.DESKTOP)}rem;
  `};
`

const UpcomingEvents = withTheme(({ theme, event }) => (
  <Wrapper>
    <EventBackground image={eventBigBackground()} />
    <Header>Upcoming event</Header>
    <EventTitle>{event.title}</EventTitle>

    <EventInfo>
      <EventInfoRow>
        <LocationIcon color={theme.lipstick} opaque />

        <EventText>{event.address || 'Уточняется'}</EventText>
      </EventInfoRow>

      <EventInfoRow>
        <ClockIcon color={theme.lipstick} opaque />

        <EventText>
          {event.date ? moment(event.date).format('LLL') : 'Уточняется'}
        </EventText>
      </EventInfoRow>
    </EventInfo>

    <TalksBlock>
      {event.talks.map((talk, i) => (
        <TalkInfo key={talk.title}>
          <DiamondOuterWrapper>
            <Diamond
              color={i % 2 ? theme.rouge : theme.grape}
              backSrc={talk.speaker.avatar}
            />
          </DiamondOuterWrapper>

          <TalkDataWrapper>
            <TalkTitle>{talk.title}</TalkTitle>

            <Box
              is={TalkSpeaker}
              to={talk.speaker.fields.slug.replace('speaker', 'speakers')}
              fontSize={['14px', '14px', '20px']}>
              {talk.speaker.title}
            </Box>
          </TalkDataWrapper>
        </TalkInfo>
      ))}
    </TalksBlock>

    <ArrowLinkWrapper>
      <ArrowLink to={event.fields.slug}>See details</ArrowLink>
    </ArrowLinkWrapper>
  </Wrapper>
))

UpcomingEvents.propTypes = {
  event: PropTypes.shape({
    address: PropTypes.string,
    date: PropTypes.string,
    talks: PropTypes.array.isRequired,
  }),
}

export default UpcomingEvents
