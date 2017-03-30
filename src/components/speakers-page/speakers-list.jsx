import React from 'react';

import styled, { withTheme } from 'styled-components';

import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import { FilterBlock, Search } from '../page-filter';
import SpeakerCard from '../../components/speaker-card/speaker-card';
import Button from '../common/button';

const SpeakerCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     ${media.phone`
        flex-flow: row wrap;  
        justify-content: flex-start;
    `}
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const speaker = {
    initials: 'Christopher Douglas',
    description: 'Freelancer, Javascript developer, Senior Front-end developer',
    talksCount: 7,
};

const SpeakersList = withTheme(({ theme }) => (
    <MainContainer>
        <BlockHeader>Speakers</BlockHeader>
        <FilterBlock>
            <Search placeholder="Search for speaker…" />
        </FilterBlock>
        <SpeakerCardContainer>
            <SpeakerCard speaker={speaker} />
            <SpeakerCard speaker={speaker} />
            <SpeakerCard speaker={speaker} />
        </SpeakerCardContainer>
        <ButtonContainer>
            <Button defaultSheme={theme.lipstick} hoverColor={'#fff'}>Load More</Button>
        </ButtonContainer>
    </MainContainer>
));

export default SpeakersList;
