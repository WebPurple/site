import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { height, fontSize } from 'styled-system'
import { Box, Flex } from 'grid-styled'
import Helmet from 'react-helmet'
import { VK, Like } from 'react-vk'

import { media } from '../../utils/css-utils'

import EventBG from './event-background'
import BlockHeader from '../common/block-header'
import { TagList } from '../common/tag'
import { ClockIcon, PlaceholderIcon } from './../icons'
import EventMap from './event-map'
import { eventBigBackground, eventTags } from '../../utils/selectors'
import { VkIcon, FacebookIcon } from '../icons/social'
import { HiddenText } from '../../utils/accessibility'
import EventTalk from './talks/talk'

const EventTitle = styled.h2`
  ${fontSize};
  font-family: Rubik, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.lipstick};
`

const Description = styled.div`
  font-family: Oxygen, sans-serif;
  color: ${props => props.theme.greyishBrown};
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

let StyledVkIcon = styled(VkIcon)`
  ${height};
`

let StyledFbIcon = styled(FacebookIcon)`
  ${height};
`

let EventSocialNetworks = ({ socialNetworks }) => (
  <Flex is="ul" style={{ listStyle: 'none' }} m={0} p={0}>
    {socialNetworks.map(sn => (
      <li key={sn.link}>
        <a
          href={sn.link}
          title="Event in vkontakte"
          target="_blank"
          rel="noopener noreferrer">
          {sn.type === 'vk' ? (
            <React.Fragment>
              <HiddenText>Event in vkontakte</HiddenText>
              <StyledVkIcon height={['3rem', '3.6rem']} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <HiddenText>Event in Facebook</HiddenText>
              <StyledFbIcon height={['3rem', '3.6rem']} />
            </React.Fragment>
          )}
        </a>
      </li>
    ))}
  </Flex>
)

const EventPage = ({ event }) => (
  <Box
    m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}
    itemScope
    itemType="http://schema.org/Event">
    <Helmet>
      <title>WebPurple | {event.title}</title>
      <meta property="og:title" content={event.title} />
      <meta property="og:description" content={event.description} />
      <meta property="og:type" content="event" />
      <meta property="og:image" content={eventBigBackground()} />
    </Helmet>

    <EventBG image={eventBigBackground()} />

    <TagList tags={eventTags(event)} />

    <EventTitle
      fontSize={['2.6rem', '3.6rem', '6.2rem', '7.8rem']}
      itemProp="name">
      {event.title}
    </EventTitle>

    <Flex mb={['3.2rem', '3.2rem', '6.4rem']} flexDirection="column">
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box
          is={Description}
          flex={4}
          order={[1, 1, 0]}
          fontSize={['1.6rem', '2.4rem']}
          mr={['0', '4.5rem']}
          itemProp="description">
          {event.description}
        </Box>
        <Flex flexDirection="column" flex={3}>
          <InfoText itemProp="location">
            <PlaceholderIconStyled />
            {event.address || 'Уточняется'}
          </InfoText>
          <InfoText itemProp="startDate">
            <ClockIconStyled />
            {event.date
              ? moment(event.date).format('D MMMM YYYY [at] HH:mm')
              : 'Уточняется'}
          </InfoText>
        </Flex>
      </Flex>

      <Flex mt="3.6rem" justifyContent="space-between" alignItems="flex-end">
        <VK apiId={5360165} options={{ version: 152 }}>
          <Like options={{ type: 'mini', height: 30 }} pageId={event.title}/>
        </VK>

        {event.socialNetworks && (
          <EventSocialNetworks socialNetworks={event.socialNetworks} />
        )}
      </Flex>
    </Flex>

    <BlockHeader>Talks</BlockHeader>
    <Flex flexWrap="wrap" mt="6.4rem" mx="-1rem">
      {event.talks.map(talk => (
        <Box width={[1, 1, 1 / 2]} p="1rem">
          <EventTalk key={talk.title} talk={talk} />
        </Box>
      ))}
    </Flex>

    {new Date(event.date) < new Date() ? null : (
      <React.Fragment>
        <BlockHeader>Location</BlockHeader>
        <Box
          style={{ height: '50rem' }}
          mt={['3.6rem', '6.4rem']}
          mb={['6rem', '9.6rem']}>
          <EventMap location={event.address} />
        </Box>
      </React.Fragment>
    )}
  </Box>
)

EventPage.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string,
    date: PropTypes.string,
    talks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
}

export default EventPage
