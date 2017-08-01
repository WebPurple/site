import React from 'react';

import styled, { withTheme } from 'styled-components';

import Button from '../common/button';
import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import { FilterBlock, Search } from '../page-filter';
import { StyledLoader, NoEventsBlock } from '../events-page/events-feed';
import SpeakerCard from '../../components/speaker-card/speaker-card';

const SpeakerCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     ${media.desktop`
        flex-flow: row wrap;  
        justify-content: flex-start;
    `}
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SpeakersList = withTheme(({ theme, speakersList, isFetching, onSearch }) => (
    <MainContainer>
        <BlockHeader>Speakers</BlockHeader>
        <FilterBlock>
            <Search
                placeholder="Search for speaker…"
                onChange={event => onSearch(event.target.value)} />
        </FilterBlock>
        <SpeakerCardContainer>
            {isFetching
                ? <StyledLoader size="80" border="8" />
                : speakersList.length
                    ? speakersList.map(speaker => (<SpeakerCard key={speaker._id} speaker={speaker} />))
                    : <NoEventsBlock>There are no speakers satisfying your query...</NoEventsBlock>
            }
        </SpeakerCardContainer>
        <ButtonContainer>
            <Button defaultSheme={theme.lipstick} hoverColor={'#fff'}>Load More</Button>
        </ButtonContainer>
    </MainContainer>
));

export default SpeakersList;
