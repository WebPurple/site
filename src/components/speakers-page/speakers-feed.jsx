import React from 'react';
// import { Link } from 'react-router';
// import styled from 'styled-components';

// import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import FilterBlock from '../common/filter-block';
import SearchBlock from '../common/search-block';

const SpeakersFeed = () => (
    <MainContainer>
        <BlockHeader>Speakers</BlockHeader>
        <FilterBlock>
            <SearchBlock />
        </FilterBlock>
    </MainContainer>
);

export default SpeakersFeed;
