import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import { media } from '../utils/css-utils'
import BlockHeader from './common/block-header'
import {
  VkIcon,
  FacebookSquareIcon,
  YoutubeIcon,
  TelegramIcon,
  InstagramIcon,
} from './icons/social/index'
import { HiddenText } from '../utils/accessibility'

const responsiveHeight = (component, mobile, tablet, desktop) => styled(
  component,
)`
  height: ${mobile}px;
  ${media.tablet`height: ${tablet}px`};
  ${media.desktop`height: ${desktop}px`};
`

let socialNetworks = [
  {
    link: 'https://vk.com/webpurple',
    description: 'We are in Vkontakte',
    icon: responsiveHeight(VkIcon, 22, 42, 50),
  },
  {
    link: 'https://www.facebook.com/WebPurple',
    description: 'We are in Facebook',
    icon: responsiveHeight(FacebookSquareIcon, 30, 65, 80),
  },
  {
    link: 'https://www.youtube.com/channel/UCFOQWgbqJbU8sVuWHGln2aA',
    description: 'Our youtube channel',
    icon: responsiveHeight(YoutubeIcon, 30, 60, 70),
  },
  {
    link: 'https://t.me/WebPurple',
    description: 'We are in telegram',
    icon: responsiveHeight(TelegramIcon, 30, 55, 65),
  },
  {
    link: 'https://www.instagram.com/webpurple',
    description: 'We are in instagram',
    icon: responsiveHeight(InstagramIcon, 30, 65, 80),
  },
]

export default () => (
  <Box p={['6rem 2rem', '9rem 7rem', '10rem']}>
    <BlockHeader>Join&nbsp;us&nbsp;in&nbsp;social networks!</BlockHeader>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={0}
      mt={['5rem', '10rem']}
      style={{ listStyle: 'none' }}>
      {socialNetworks.map(({ link, description, icon: Icon }) => (
        <li>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <HiddenText>{description}</HiddenText>
            <Icon />
          </a>
        </li>
      ))}
    </Flex>
  </Box>
)
