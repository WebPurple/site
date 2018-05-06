import React from 'react'
import Helmet from 'react-helmet'
import { withState } from 'recompose'
import styled from 'styled-components'

import { media } from '../../utils/css-utils'
import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { FilterBlock, Search } from '../page-filter'
import { NoEventsBlock } from '../events-page/events-feed'
import SpeakerCard from '../../components/speaker-card/speaker-card'
import { elasticSearch } from '../../utils/search'

const SpeakerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.desktop`
    flex-flow: row wrap;  
    justify-content: flex-start;
  `};
`

const speakerElasticSearch = elasticSearch([
  'title',
  'organization',
  'jobTitle',
])

export default withState('query', 'search', '')(
  ({ speakers, search, query }) => (
    <MainContainer>
      <Helmet title="Speakers" />
      <BlockHeader size="h1">Speakers</BlockHeader>

      <FilterBlock>
        <Search
          placeholder="Search for speaker…"
          onChange={event => search(event.target.value)}
        />
      </FilterBlock>

      <SpeakerCardContainer>
        {speakers.length ? (
          speakers
            .filter(speakerElasticSearch(query))
            .map(speaker => (
              <SpeakerCard key={speaker.title} speaker={speaker} />
            ))
        ) : (
          <NoEventsBlock>
            There are no speakers satisfying your query...
          </NoEventsBlock>
        )}
      </SpeakerCardContainer>
    </MainContainer>
  ),
)
