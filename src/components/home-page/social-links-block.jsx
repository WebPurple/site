import React from 'react';
import styled from 'styled-components';

import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import {
    VkIcon,
    FacebookSquareIcon,
    YoutubeIcon,
    TwitterIcon,
    InstagramIcon,
} from '../icons/social';

const SocialLinksContainer = styled.section`
    padding: 6rem 2rem;
    ${media.tablet`padding: 9rem 7rem;`}
    ${media.desktop`padding: 10rem;`}
`;

const LinksWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5rem 0 0 0;
    ${media.desktop`margin: 10rem 0 0 0;`}
`;

const HiddenText = styled.span`
    clip: rect(0 0 0 0);
    position: absolute;
`;

const responsiveHeight = (component, mobile, tablet, desktop) => styled(component)`
    height: ${mobile}px;
    ${media.tablet`height: ${tablet}px;`}
    ${media.desktop`height: ${desktop}px;`}
`;

const StyledVkIcon = responsiveHeight(VkIcon, 22, 42, 50);
const StyledFacebookIcon = responsiveHeight(FacebookSquareIcon, 30, 65, 80);
const StyledYoutubeIcon = responsiveHeight(YoutubeIcon, 30, 60, 70);
const StyledTwitterIcon = responsiveHeight(TwitterIcon, 30, 55, 65);
const StyledInstagramIcon = responsiveHeight(InstagramIcon, 30, 65, 80);

export default () => (
    <SocialLinksContainer>
        <BlockHeader>Join&nbsp;us&nbsp;in&nbsp;social networks!</BlockHeader>
        <LinksWrapper>
            <li>
                <a href="https://vk.com/webpurple" target="_blank" rel="noopener noreferrer">
                    <HiddenText>We are in VK</HiddenText>
                    <StyledVkIcon />
                </a>
            </li>
            <li>
                <a href="https://www.facebook.com/WebPurple" target="_blank" rel="noopener noreferrer">
                    <HiddenText>We are in Facebook</HiddenText>
                    <StyledFacebookIcon />
                </a>
            </li>
            <li>
                <a href="https://www.youtube.com/channel/UCFOQWgbqJbU8sVuWHGln2aA" target="_blank" rel="noopener noreferrer">
                    <HiddenText>Our youtube channel</HiddenText>
                    <StyledYoutubeIcon />
                </a>
            </li>
            <li><StyledTwitterIcon /></li>
            <li><StyledInstagramIcon /></li>
        </LinksWrapper>
    </SocialLinksContainer>
);
