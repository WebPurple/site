// @flow
import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { fontSize, height } from 'styled-system'
import { Box, Flex } from 'grid-styled'
import Helmet from 'react-helmet'
import VK, { Like as VkLike } from 'react-vk'
import { FacebookProvider, Like as FbLike } from 'react-facebook'
import canUseDom from 'can-use-dom'
import { DiscussionEmbed } from 'disqus-react'

import { BrowserOnly, media } from '../../utils/css-utils'

import EventBG from './event-background'
import BlockHeader from '../common/block-header'
import { TagList } from '../common/tag'
import { ClockIcon, PlaceholderIcon } from './../icons'
import EventMap from './event-map'
import { eventBigBackground, eventTags } from '../../utils/selectors'
import { FacebookIcon, VkIcon } from '../icons/social'
import { HiddenText } from '../../utils/accessibility'
import EventTalk from './talks/talk'
import Layout from '../layout'
import ImageGallery from '../image-gallery'
import type { EventType } from '../../model'

const EventTitle = styled.h1`
  ${fontSize};
  font-weight: bold;
  color: ${props => props.theme.lipstick};
`

const Description = styled.div`
  color: ${props => props.theme.greyishBrown};
`

const InfoText = styled.div`
  margin-bottom: 2.5rem;
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
  ${IconStyleMixin} ${media.phone`
    margin-right: 1.2rem;
  `} ${media.tablet`
    margin-right: 1.6rem;
    width: 2.8rem;
    height: 2.8rem;
  `} & path {
    fill: ${props => props.theme.lipstick};
    opacity: 1;
  }
`

const ClockIconStyled = styled(ClockIcon)`
  ${IconStyleMixin} ${media.phone`
    margin-right: 1.2rem;
  `} ${media.tablet`
    margin-right: 1.6rem;
    width: 2.8rem;
    height: 2.8rem;
  `} & path {
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

const EventPage = ({ event }: { event: EventType }) => (
  <Layout>
    <Box
      m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}
      itemScope
      itemType="http://schema.org/Event">
      <Helmet title={event.title}>
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:type" content="event" />
        <meta
          property="og:image"
          content="https://webpurple.net/img/social-thumbnail-bg.png"
        />
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
              <span itemProp="address">{event.address || 'Уточняется'}</span>
            </InfoText>
            <InfoText itemProp="startDate">
              <ClockIconStyled />
              {event.date
                ? format(parse(event.date), 'D MMMM YYYY [at] HH:mm')
                : 'Уточняется'}
            </InfoText>
          </Flex>
        </Flex>

        <Flex mt="3.6rem" justifyContent="space-between" alignItems="flex-end">
          <BrowserOnly>
            <Flex alignItems="center">
              <VK apiId={5360165} options={{ version: 152 }}>
                <VkLike
                  options={{ type: 'mini', height: 30 }}
                  pageId={event.fields.slug}
                />
              </VK>

              <FacebookProvider appId="1094823327247465">
                <FbLike layout="button_count" share />
              </FacebookProvider>
            </Flex>
          </BrowserOnly>

          {event.socialNetworks && (
            <EventSocialNetworks socialNetworks={event.socialNetworks} />
          )}
        </Flex>
      </Flex>

      <BlockHeader>Talks</BlockHeader>
      <Flex flexWrap="wrap" mt="6.4rem" mx="-1rem">
        {event.talks.map(talk => (
          <Box
            width={[1, 1, 1 / 2]}
            p="10px"
            mb={['60px', '64px']}
            key={talk.title}>
            <EventTalk talk={talk} />
          </Box>
        ))}
      </Flex>

      {event.vkAlbum && <ImageGallery images={event.vkAlbum.photos} />}

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

      <DiscussionEmbed
        shortname="WebPurple"
        config={{
          url: canUseDom
            ? window.location.href
            : `https://www.webpurple.net${event.fields.slug}`,
          identifier: event.fields.slug,
          title: event.title,
        }}
      />
    </Box>
  </Layout>
)

export default EventPage
