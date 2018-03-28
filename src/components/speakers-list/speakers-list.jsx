import React from 'react'

import styled, { withTheme } from 'styled-components'

import { media } from '../../utils/css-utils'
import BlockHeader from '../common/block-header'
import MainContainer from '../common/main-container'
import { FilterBlock, Search } from '../page-filter'
import { NoEventsBlock } from '../events-page/events-feed'
import SpeakerCard from '../../components/speaker-card/speaker-card'

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

export default ({ speakers, onSearch }) => (
  <MainContainer>
    <BlockHeader>Speakers</BlockHeader>
    <FilterBlock>
      <Search
        placeholder="Search for speaker…"
        onChange={event => onSearch(event.target.value)}
      />
    </FilterBlock>
    <SpeakerCardContainer>
      {speakers.length ? (
        speakers.map(speaker => (
          <SpeakerCard key={speaker.title} speaker={speaker} />
        ))
      ) : (
        <NoEventsBlock>
          There are no speakers satisfying your query...
        </NoEventsBlock>
      )}
    </SpeakerCardContainer>
  </MainContainer>
)
