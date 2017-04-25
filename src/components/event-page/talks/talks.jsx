import React from 'react';
import styled from 'styled-components';

import { media } from './../../../utils/css-utils';
import EventTalk from './talk';

const TalksGrid = styled.div`
    column-count: 1;
    column-fill: balance;
    column-gap: 12px;
    margin-top: 6.4rem;

    ${media.desktop`
        column-count: 2;
    `}
`;

const EventTalks = ({ talks }) => (
    <TalksGrid>
        { talks.map(talk => <EventTalk key={talk.title} talk={talk} />) }
    </TalksGrid>
);

EventTalks.propTypes = {
    talks: React.PropTypes.array.isRequired,
};

export default EventTalks;
