import React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import PastEvents from '../../containers/events/past-events';

import SubscriptionForm from '../subscription-form/subscription-form';
import SocialLinks from './social-links-block';

const EmptyBlock = styled.section`
    font-family: 'Rubik', sans-serif;
    font-size: 4.8em;
    text-align: center;
    vertical-align: middle;
    line-height: 2em;
    ${media.tablet`line-height: 4em;`}
    ${media.hd`line-height: 6em;`}
`;

const HomePage = () => (
    <div>
        <EmptyBlock>Upcoming events</EmptyBlock>
        <PastEvents />
        <SubscriptionForm />
        <SocialLinks />
    </div>
);

export default HomePage;
