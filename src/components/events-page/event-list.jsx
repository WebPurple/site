import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grid-styled'
import moment from 'moment'

import { TagList } from '../common/tag'
import { ClockIcon, PlaceholderIcon } from '../icons'
import { eventSmallBackground, eventTags } from '../../utils/selectors'
import AdaptiveMasonryList from '../adaptive-masonry-list'

const EventSnippet = styled.li`
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 8px 1px #bbb;
`

const BackgroundShape = styled.div`
  position: absolute;
  top: 0;
  left: -60%;
  width: 230%;
  height: 100%;
  transform: skew(-60deg, 0);
  overflow: hidden;
  z-index: -1;
`

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  filter: grayscale(100);
  opacity: 0.15;
  background: url(${props => props.url}) no-repeat;
  background-size: cover;
  transform: skew(60deg, 0);
`

const Title = styled(Link)`
  margin: 2.4rem 0;
  font-family: 'Rubik', sans-serif;
  font-size: 3.6rem;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.color || props.theme.vividPurpleTwo};
`

const Info = styled.span`
  display: flex;
  margin-bottom: 1.6rem;
  font-size: 1.6em;
  color: ${props => props.theme.greyishBrown};
  vertical-align: middle;
`

const TalkList = styled.ul`
  list-style: disc;
  font-size: 1.6rem;
  margin: 2.4rem 0;
  color: #4a4a4a;
`

const EventList = ({ events, theme, onTagClick, selectedTags }) => (
  <Box
    is={AdaptiveMasonryList}
    w="100%"
    mx="auto"
    mt={['3.6rem', '3.6rem', '10rem']}>
    {events.map((event, eventIndex) => (
      <Box
        is={EventSnippet}
        key={event.title}
        w={['100%', '30rem', '30rem', '35rem']}
        p="2.5rem"
        mb={['2rem', '2rem', '7rem']}>
        <BackgroundShape>
          <BackgroundImage url={eventSmallBackground()} />
        </BackgroundShape>

        <header>
          <Info>
            <ClockIcon style={{ marginRight: '1.6rem' }} />
            <time>
              {event.date ? moment(event.date).format('LLL') : 'Уточняется'}
            </time>
          </Info>

          <Info>
            <PlaceholderIcon style={{ marginRight: '1.6rem' }} />
            <span>{event.address || 'Уточняется'}</span>
          </Info>

          <Title
            className="e2e-event-card-title"
            color={eventIndex % 2 ? theme.vividPurpleTwo : theme.lipstick}
            to={event.fields.slug}>
            {event.title}
          </Title>
        </header>

        <TalkList>
          {event.talks.map(talk => (
            <Box key={talk.title} m="1.6rem">
              {talk.title}
            </Box>
          ))}
        </TalkList>

        <TagList
          tags={eventTags(event)}
          onTagClick={onTagClick}
          selectedTags={selectedTags}
        />
      </Box>
    ))}
  </Box>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
  theme: PropTypes.object.isRequired,
  onTagClick: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
}

export default withTheme(EventList)
