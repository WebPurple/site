import React from 'react';
import styled from 'styled-components';

import { translitRU } from './../../utils/language-utils';

const googleMapURL = 'https://www.google.com/maps/embed/v1/place';
const googleAPIKey = 'AIzaSyB_JpZ8GN_chlj0Cacy7k2cEwAJ5yibrc8';

const MapFrame = styled.iframe`
    border: none;
    width: 100%;
    height: 100%;
`;

const EventMap = ({ location }) => (
    <MapFrame
        frameBorder="0"
        src={`${googleMapURL}?key=${googleAPIKey}&q=${encodeURI(translitRU(location))}`}
        allowfullscreen />
);

EventMap.propTypes = {
    location: React.PropTypes.string,
};

export default EventMap;
