import React from 'react';

import styled from 'styled-components';
import { media } from '../../utils/css-utils';
import { SearchIcon } from '../icons';

const SearchBlockWrapper = styled.div`
    padding: 0.9rem 0;
    ${media.desktop`display: flex;`}
    align-items: center;
`;

const SearchInput = styled.input`
    border: 0;
    font-size: 2.4rem;
    font-family: 'Oxygen', sans-serif;
    outline: none;
`;

const StyledSearchIcon = styled(SearchIcon)`
    height: 2.8rem;
    width: 2.8rem;
    margin-left: 1rem;
    fill: #ccc;
`;

const SearchBlock = () => (
    <SearchBlockWrapper>
        <SearchInput type="text" placeholder="Keywords..." />
        <StyledSearchIcon />
    </SearchBlockWrapper>
);

export default SearchBlock;
