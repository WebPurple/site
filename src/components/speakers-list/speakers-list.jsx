import React from 'react'
import Helmet from 'react-helmet'
import { withState } from 'recompose'
import { Flex } from 'reflexbox/styled-components'

import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { FilterBlock, Search } from '../page-filter'
import SpeakerCard from '../../components/speaker-card/speaker-card'
import { elasticSearch } from '../../utils/search'

const speakerElasticSearch = elasticSearch(['id', 'organization', 'jobTitle'])

export default withState(
  'query',
  'search',
  '',
)(({ speakers, search, query }) => (
  <MainContainer>
    <Helmet title="Speakers" />
    <BlockHeader size="h1">Speakers</BlockHeader>

    <FilterBlock>
      <Search
        placeholder="Search for speaker…"
        onChange={event => search(event.target.value)}
      />
    </FilterBlock>

    <Flex
      flexDirection={['column', 'row']}
      justifyContent={['center']}
      flexWrap="wrap">
      {speakers.length ? (
        speakers
          .filter(speakerElasticSearch(query))
          .map(speaker => <SpeakerCard key={speaker.id} speaker={speaker} />)
      ) : (
        <p>There are no speakers satisfying your query...</p>
      )}
    </Flex>
  </MainContainer>
))
