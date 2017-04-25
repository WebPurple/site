import React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import {
    FacebookSquareIcon,
    InstagramIcon,
    TwitterIcon,
    VkIcon,
    YoutubeIcon,
} from './../icons/social';

const SocialIconLink = styled.a`
    display: inline-block;
    height: 3rem;
    margin-left: 2rem;

    ${media.tablet`
        height: 3.6rem;

        & + & {
            margin-left: 2.4rem;
        }
    `}
`;

const EventSocialLinks = () => (
    <div>
        <SocialIconLink href="https://vk.com/webpurple" target="_blank" rel="noopener noreferrer">
            <VkIcon height={'100%'} />
        </SocialIconLink>
        <SocialIconLink href="https://www.facebook.com/WebPurple" target="_blank" rel="noopener noreferrer">
            <FacebookSquareIcon height={'100%'} />
        </SocialIconLink>
        <SocialIconLink href="https://www.youtube.com/channel/UCFOQWgbqJbU8sVuWHGln2aA" target="_blank" rel="noopener noreferrer">
            <YoutubeIcon height={'100%'} />
        </SocialIconLink>
        <SocialIconLink><TwitterIcon height={'100%'} /></SocialIconLink>
        <SocialIconLink><InstagramIcon height={'100%'} /></SocialIconLink>
    </div>
);

export default EventSocialLinks;
