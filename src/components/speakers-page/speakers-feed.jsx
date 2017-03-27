import React from 'react';
// import { Link } from 'react-router';
import styled from 'styled-components';

// import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import FilterBlock from '../common/filter-block';
import SearchBlock from '../common/search-block';
import SpeakerCard from '../../components/speaker-card/speaker-card';

const SpeakerCardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const LoadMoreButton = styled.button`
    display: block;
    margin: 0px auto;
    padding: 15px 35px;
    border: solid 3px #e62270;
    text-transform: uppercase;
    background-color: #fff;
    cursor: pointer;
    font-family: Rubik;
    font-size: 24px;
    font-weight: bold;
    color: #e62270;
    
    &:hover {
        color: black;
        border-color: black;
    }
`;

const SpeakersFeed = () => (
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

export default SpeakersFeed;
