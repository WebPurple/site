import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import { withStateHandlers } from 'recompose'
import {
  always,
  both,
  difference,
  either,
  flatten,
  isEmpty,
  map,
  pipe,
  uniq,
  when,
} from 'ramda'

import { isPhone, isTablet } from '../../utils/css-utils'
import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { TagList } from '../common/tag'
import { FilterBlock, FilterTab, Search } from '../page-filter'
import EventList from './event-list'
import { elasticSearch } from '../../utils/search'
import { eventTags } from '../../utils/selectors'

export const NoEventsBlock = styled.div`
  margin: 10rem 0;
  text-align: center;
  font-family: 'Oxygen', sans-serif;
  font-size: 2.5rem;
  color: ${props => props.theme.warmPurple};
`

let eventElasticSearch = elasticSearch(['title', 'address'])
let shouldExpandSearch = () => isPhone() || isTablet()

let EventsFeed = ({
  events,
  onSearch,
  query,
  showSearch,
  handleSearchFocus,
  handleSearchBlur,
  selectedTags,
  toggleTag,
}) => {
  let filteredEvents = events.filter(
    both(
      eventElasticSearch(query),
      either(
        () => isEmpty(selectedTags),
        pipe(
          eventTags,
          difference(selectedTags),
          isEmpty,
        ),
      ),
    ),
  )
  let allEventsTags = pipe(
    map(eventTags),
    flatten,
    uniq,
  )(filteredEvents)
  let show = ''

  return (
    <MainContainer>
      <Helmet title="Events" />
      <BlockHeader size="h1">Events</BlockHeader>
      <FilterBlock>
        {!showSearch /* TODO: animate */ && (
          <Flex>
            {['All', 'Upcoming', 'Past'].map(filter => (
              <FilterTab
                key={filter}
                to={`/events?show=${filter.toLowerCase()}`}
                data-active={show === filter.toLowerCase()}>
                {filter}
              </FilterTab>
            ))}
          </Flex>
        )}
        <Search
          placeholder="Keyword..."
          onChange={event => onSearch(event.target.value)}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </FilterBlock>

      {(allEventsTags.length > 0 || !selectedTags.length) && (
        <TagList
          label="Events tags"
          tags={allEventsTags.length > 0 ? allEventsTags : selectedTags}
          selectedTags={selectedTags}
          onTagClick={toggleTag}
        />
      )}

      {events.size === 0 ? (
        <NoEventsBlock>
          There are no events satisfying your query...
        </NoEventsBlock>
      ) : (
        <EventList
          events={filteredEvents}
          onTagClick={toggleTag}
          selectedTags={selectedTags}
        />
      )}
    </MainContainer>
  )
}

EventsFeed.propTypes = {
  events: PropTypes.arrayOf(Object),
  query: PropTypes.string,
  onSearch: PropTypes.func,
  showSearch: PropTypes.bool,
  handleSearchFocus: PropTypes.func,
  handleSearchBlur: PropTypes.func,
}

export default withStateHandlers(
  () => ({
    query: '',
    showSearch: false,
    selectedTags: [],
  }),
  {
    onSearch: () => query => ({ query }),
    handleSearchFocus: () => () =>
      when(shouldExpandSearch, always({ showSearch: true })),
    handleSearchBlur: () => () =>
      when(shouldExpandSearch, always({ showSearch: false })),

    toggleTag: ({ selectedTags }) => tag => ({
      selectedTags: selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag],
    }),
  },
)(EventsFeed)
