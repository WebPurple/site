import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import { withStateHandlers } from 'recompose'
import { when, always } from 'ramda'

import { isPhone, isTablet } from '../../utils/css-utils'
import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { TagList } from '../common/tag'
import { FilterBlock, FilterTab, Search } from '../page-filter'
import EventList from './event-list'
import { elasticSearch } from '../../utils/search'

const NoEventsBlock = styled.div`
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
}) => {
  let tags = []
  let selectedTags = []
  let show = ''
  let onTagClick = () => void 0

  return (
    <MainContainer>
      <BlockHeader>Events</BlockHeader>
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

      {(tags.length > 0 || !selectedTags.length) && (
        <TagList
          label="Events tags"
          tags={tags.length > 0 ? tags : selectedTags}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
        />
      )}

      {events.size === 0 ? (
        <NoEventsBlock>
          There are no events satisfying your query...
        </NoEventsBlock>
      ) : (
        <EventList events={events.filter(eventElasticSearch(query))} />
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
  }),
  {
    onSearch: () => query => ({ query }),
    handleSearchFocus: () => () =>
      when(shouldExpandSearch, always({ showSearch: true })),
    handleSearchBlur: () => () =>
      when(shouldExpandSearch, always({ showSearch: false })),
  },
)(EventsFeed)
