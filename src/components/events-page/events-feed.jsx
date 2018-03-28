import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { List, Set } from 'immutable'

import { isPhone, isTablet } from '../../utils/css-utils'
import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { TagList } from '../common/tag'
import Loader from '../common/loader'
import { FilterBlock, FilterMenuLink, FilterTab, Search } from '../page-filter'
import EventList from './event-list'

const FlexRow = styled.div`
  display: flex;
`

const AddEventButton = FilterMenuLink.withComponent('button').extend`
  color: ${props => props.theme.greyishBrown};
  cursor: pointer;
  background-color: transparent;
  border: 0px;
`

// TODO: move to the common components if it needs (it is used the pages of events and speakers)
export const StyledLoader = styled(Loader)`
  margin: 15rem auto;
`

// TODO: move to the common components if it needs (it is used the pages of events and speakers)
export const NoEventsBlock = styled.div`
  margin: 10rem 0;
  text-align: center;
  font-family: 'Oxygen', sans-serif;
  font-size: 2.5rem;
  color: ${props => props.theme.warmPurple};
`

class EventsFeed extends React.Component {
  static shouldExpandSearch() {
    return isPhone() || isTablet()
  }

  constructor(props) {
    super(props)
    this.state = { showSearch: false }

    this.toggleSearch = this.toggleSearch.bind(this)
    this.handleSearchFocus = this.handleSearchFocus.bind(this)
    this.handleSearchBlur = this.handleSearchBlur.bind(this)
  }

  toggleSearch(showSearch) {
    this.setState({ showSearch })
  }

  handleSearchFocus() {
    if (EventsFeed.shouldExpandSearch()) {
      this.toggleSearch(true)
    }
  }

  handleSearchBlur() {
    if (EventsFeed.shouldExpandSearch()) {
      this.toggleSearch(false)
    }
  }

  render() {
    let { events } = this.props
    let tags = []
    let selectedTags = []
    let show = ''
    let onTagClick = () => void 0

    const { showSearch } = this.state

    return (
      <MainContainer>
        <BlockHeader>Events</BlockHeader>
        <FilterBlock>
          {!showSearch /* TODO: animate */ && (
            <FlexRow>
              {['All', 'Upcoming', 'Past'].map(filter => (
                <FilterTab
                  key={filter}
                  to={`/events?show=${filter.toLowerCase()}`}
                  data-active={show === filter.toLowerCase()}>
                  {filter}
                </FilterTab>
              ))}
            </FlexRow>
          )}
          <Search
            placeholder="Keyword..."
            onChange={event => onSearch(event.target.value)}
            onFocus={this.handleSearchFocus}
            onBlur={this.handleSearchBlur}
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
          <EventList events={events} />
        )}
      </MainContainer>
    )
  }
}

EventsFeed.propTypes = {
  events: PropTypes.arrayOf(Object),
  tags: PropTypes.arrayOf(String),
  selectedTags: PropTypes.instanceOf(Set),
  show: PropTypes.string,
  onTagClick: PropTypes.func,
  onCreateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onSearch: PropTypes.func,
  isFetching: PropTypes.bool,
}

export default EventsFeed
