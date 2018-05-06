import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'

import Masonry from 'react-masonry-component'
import moment from 'moment'

import { isPhone, isTablet, media } from '../../utils/css-utils'
import { TagList } from '../common/tag'
import { ClockIcon, PlaceholderIcon } from '../icons'
import { eventSmallBackground, eventTags } from '../../utils/selectors'

const gutter = isTablet() ? 30 : 75 // space between cards

const Container = styled(
  ({ children, className }) =>
    isPhone() ? (
      <ul className={className}>{children}</ul>
    ) : (
      <Masonry
        className={className}
        elementType="ul"
        options={{ gutter, fitWidth: true }}>
        {children}
      </Masonry>
    ),
)`
  list-style: none;
  padding: 0;
  margin: 3.6rem auto 0;
  ${media.desktop`margin-top: 10rem;`};
`

const EventSnippet = styled.li`
  position: relative;
  width: 100%;
  ${media.tablet`width: 30rem;`} ${media.hd`width: 35rem;`} padding: 2.5rem;
  margin-bottom: 2rem;
  ${media.desktop`margin-bottom: 7rem`};
  box-sizing: border-box;
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
  background: url(${props => props.url});
  background-repeat: no-repeat;
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
  font-family: 'Oxygen', sans-serif;
  color: ${props => props.theme.greyishBrown};
  vertical-align: middle;
`

const TalkList = styled.ul`
  list-style: disc;
  font-family: 'Oxygen', sans-serif;
  font-size: 1.6rem;
  margin: 2.4rem 0;
  color: #4a4a4a;
`

const Talk = styled.li`
  margin: 1.6rem 0;
`

const EventList = ({ events, theme, onTagClick, selectedTags }) => (
  <Container>
    {events.map((event, eventIndex) => (
      <EventSnippet className="e2e-event-card" key={event.title}>
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
          {event.talks.map(talk => <Talk key={talk.title}>{talk.title}</Talk>)}
        </TalkList>
        <TagList
          tags={eventTags(event)}
          onTagClick={onTagClick}
          selectedTags={selectedTags}
        />
      </EventSnippet>
    ))}
  </Container>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
  theme: PropTypes.object.isRequired,
  onTagClick: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
}

export default withTheme(EventList)
