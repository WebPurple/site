import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Box } from 'grid-styled'

import { media } from '../../utils/css-utils'

import EventBG from './event-background'
import BlockHeader from '../common/block-header'
import { TagList } from '../common/tag'
import EventTalks from './talks/talks'
import { ClockIcon, PlaceholderIcon } from './../icons'
import EventMap from './event-map'
import { eventTags } from '../../utils/selectors'

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
`

const BodyGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column-reverse wrap;

  ${media.desktop`
        flex-direction: row;
    `};
`

const Description = styled.div`
    width: 100%;
    font-family: Oxygen, sans-serif;
    line-height: 1.5;
    color: ${props => props.theme.greyishBrown};
    font-size: 1.6rem;
    ${media.tablet`
        font-size: 2.4rem;
    `}
    ${media.desktop`
        width: 63.2rem;
    `}
    ${media.hd`
        width: 71.4rem;
    `}
`

const InfoGrid = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.phone`
    flex-direction: row;
    justify-content: space-between;
  `} ${media.desktop`
    width: 38.2rem;
    flex-direction: column;
    justify-content: flex-start;
    width: 56rem;
  `};
`

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
  `};
`

const IconStyleMixin = `
    width: 2rem;
    height: 2rem;
    vertical-align: top;
    margin-right: 1.3rem;
`

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
`

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
`

const IllBeThereNoLoggedInBlock = styled.span`
  position: relative;
  font-family: Rubik, sans-serif;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1;
  color: ${props => props.theme.lipstick};
`

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
  `};
`

const MapWrapper = styled.div`
  height: 50rem;
  margin-top: 3.6rem;
  margin-bottom: 6rem;

  ${media.tablet`
    margin-top: 6.4rem;
    margin-bottom: 9.6rem;
  `};
`

const EventPage = ({ event }) => (
  <Box m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}>
    <EventBG image="https://sun1-8.userapi.com/c824603/v824603288/e06c8/JefKSzWFhOA.jpg" />
    <TagList tags={eventTags(event)} />
    <EventTitle>{event.title}</EventTitle>
    <BodyGrid>
      <Description>{event.description}</Description>
      <InfoGrid>
        <InfoText>
          <PlaceholderIconStyled />
          {event.address}
        </InfoText>
        <InfoText>
          <ClockIconStyled />
          {moment(event.date).format('D MMMM YYYY [at] HH:mm')}
        </InfoText>
      </InfoGrid>
    </BodyGrid>
    <BodyFooter />
    <BlockHeader>Talks</BlockHeader>
    <EventTalks talks={event.talks} />
    {new Date(event.date) < new Date() ? null : (
      <div>
        <BlockHeader>Location</BlockHeader>
        <MapWrapper>
          <EventMap location={event.address} />
        </MapWrapper>
      </div>
    )}
  </Box>
)

EventPage.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default EventPage
