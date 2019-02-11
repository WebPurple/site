import React from 'react'
import Helmet from 'react-helmet'
import { compose, withProps, withStateHandlers } from 'recompose'
import { chain, difference, either, isEmpty, pipe, uniq } from 'ramda'

import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { TagList, TagListCutter } from '../common/tag'
import EventList from './event-list'
import { eventTags } from '../../utils/selectors'

let EventsFeed = ({
  filteredEvents,
  selectedTags,
  filteredEventsTags,
  toggleTag,
}) => (
  <MainContainer>
    <Helmet title="Events" />
    <BlockHeader size="h1">Events</BlockHeader>

    {(filteredEventsTags.length > 0 || !selectedTags.length) && (
      <TagListCutter
        tagNumberDesktop={20}
        tagNumberMobile={10}
        tags={
          filteredEventsTags.length > 0 ? filteredEventsTags : selectedTags
        }>
        {(visibleTags, ToogleLable, MoreTag) => (
          <TagList
            label="Events tags"
            tags={visibleTags}
            selectedTags={selectedTags}
            onTagClick={toggleTag}
            LabelComponent={ToogleLable}
            MoreTag={MoreTag}
          />
        )}
      </TagListCutter>
    )}

    {filteredEvents && (
      <EventList
        events={filteredEvents}
        onTagClick={toggleTag}
        selectedTags={selectedTags}
      />
    )}
  </MainContainer>
)

export default compose(
  withStateHandlers(
    () => ({
      selectedTags: [],
    }),
    {
      toggleTag: ({ selectedTags }) => tag => ({
        selectedTags: selectedTags.includes(tag)
          ? selectedTags.filter(t => t !== tag)
          : [...selectedTags, tag],
      }),
    },
  ),
  withProps(({ events, selectedTags }) => {
    let filteredEvents = events.filter(
      either(
        () => isEmpty(selectedTags),
        pipe(
          eventTags,
          difference(selectedTags),
          isEmpty,
        ),
      ),
    )
    return {
      filteredEvents,
      filteredEventsTags: pipe(
        chain(eventTags),
        uniq,
      )(filteredEvents),
    }
  }),
)(EventsFeed)
