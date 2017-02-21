import React from 'react';
import styled, { withTheme } from 'styled-components';

import { media } from '../../utils/css-utils';
import Separator from '../separator';
import {
    VkIcon,
    FacebookIcon,
    YoutubeIcon,
    TwitterIcon,
    InstagramIcon,
} from '../icons/social';

const SocialLinksContainer = styled.section`
    padding: 6rem 2rem;
    ${media.tablet`padding: 9rem 7rem;`}
    ${media.desktop`padding: 10rem;`}
`;

const Heading = styled.h2`
    text-align: center;
    margin: 0;
    padding: 0 2rem;
    ${media.tablet`padding: 0 3rem;`}
    font-family: Rubik, sans-serif;
    line-height: 1em;
    font-size: 2.6em;
    ${media.tablet`font-size: 4.8em;`}
    font-weight: bold;
    color: ${props => props.theme.lipstick};
    ${media.desktop`white-space: nowrap;`}
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
const StyledFacebookIcon = responsiveHeight(FacebookIcon, 30, 65, 80);
const StyledYoutubeIcon = responsiveHeight(YoutubeIcon, 30, 60, 70);
const StyledTwitterIcon = responsiveHeight(TwitterIcon, 30, 55, 65);
const StyledInstagramIcon = responsiveHeight(InstagramIcon, 30, 65, 80);

export default withTheme(({ theme }) => (
    <SocialLinksContainer>
        <Separator color={theme.lipstick}>
            <Heading>Join&nbsp;us&nbsp;in&nbsp;social networks!</Heading>
        </Separator>
        <LinksWrapper>
            <li>
                <a href="https://vk.com/webpurple" target="_blank">
                    <HiddenText>We are in VK</HiddenText>
                    <StyledVkIcon />
                </a>
            </li>
            <li>
                <a href="https://www.facebook.com/WebPurple" target="_blank">
                    <HiddenText>We are in Facebook</HiddenText>
                    <StyledFacebookIcon />
                </a>
            </li>
            <li>
                <a href="https://www.youtube.com/channel/UCFOQWgbqJbU8sVuWHGln2aA" target="_blank">
                    <HiddenText>Our youtube channel</HiddenText>
                    <StyledYoutubeIcon />
                </a>
            </li>
            <li><StyledTwitterIcon /></li>
            <li><StyledInstagramIcon /></li>
        </LinksWrapper>
    </SocialLinksContainer>
));
