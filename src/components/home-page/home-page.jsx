import React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import PastEvents from '../past-events/past-events';

// import SubscriptionForm from './subscription-block';

const EmptyBlock = styled.section`
    font-family: Rubik;
    font-size: 48px;
    text-align: center;
    vertical-align: middle;
    line-height: 100px;
    ${media.tablet`line-height: 200px;`}
    ${media.hd`line-height: 300px;`}
`;

// return subscription form before PR!

const HomePage = () => (
    <div>
        <EmptyBlock>Upcoming events</EmptyBlock>
        <EmptyBlock>Passed events</EmptyBlock>
        <PastEvents />
        <EmptyBlock>Social networks block</EmptyBlock>
    </div>
);

export default HomePage;
