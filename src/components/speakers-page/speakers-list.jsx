import React from 'react';

import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import FilterBlock from '../common/filter-block';
import SearchBlock from '../common/search-block';
import SpeakerCard from '../../components/speaker-card/speaker-card';

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

const LoadMoreButton = styled.button`
    display: block;
    margin: 0 auto;
    padding: 2.3rem 10rem;
    border: solid 0.3rem ${props => props.theme.lipstick};
    text-transform: uppercase;
    background-color: white;
    cursor: pointer;
    font-family: Rubik;
    font-size: 2.4rem;
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    transition: all 0.2s ease-in-out;
    
    &:hover {
        color: white;
        background: ${props => props.theme.lipstick};
    }
`;

const SpeakersList = () => (
    <MainContainer>
        <BlockHeader>Speakers</BlockHeader>
        <FilterBlock>
            <SearchBlock />
        </FilterBlock>
        <SpeakerCardContainer>
            <SpeakerCard />
            <SpeakerCard />
            <SpeakerCard />
        </SpeakerCardContainer>
        <LoadMoreButton>Load More</LoadMoreButton>
    </MainContainer>
);

export default SpeakersList;
