import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'grid-styled'

import {
  TwitterIcon,
  FacebookSquareIcon,
  GithubIcon,
  VkIcon,
} from '../icons/social'
import { HiddenText } from '../../utils/accessibility'

let socialNetworksNames = {
  vk: 'vkontakte',
  fb: 'facebook',
  twitter: 'twitter',
  github: 'github',
  site: 'his own website',
}

let socialNetworkHosts = {
  vk: 'https://vk.com/',
  fb: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
  github: 'https://github.com/',
  site: '',
}

let buildSocialLink = ({ type, link }) => socialNetworkHosts[type] + link

const SpeakerContacts = ({ speaker }) =>
  speaker.socialNetworks && (
    <Flex is="ul" style={{ listStyle: 'none' }} p={0} m={0}>
      {speaker.socialNetworks.map(sn => (
        <Box is="li" key={sn.type} mr="1rem">
          <a
            href={buildSocialLink(sn)}
            target="_blank"
            rel="noopener noreferrer">
            <HiddenText>
              {speaker.title} in {socialNetworksNames[sn.type]}
            </HiddenText>
            {sn.type === 'vk' ? (
              <VkIcon />
            ) : sn.type === 'fb' ? (
              <FacebookSquareIcon />
            ) : sn.type === 'twitter' ? (
              <TwitterIcon />
            ) : sn.type === 'github' ? (
              <GithubIcon />
            ) : null}
          </a>
        </Box>
      ))}
    </Flex>
  )

SpeakerContacts.propTypes = {
  speaker: PropTypes.shape({
    socialNetworks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
}

export { SpeakerContacts }

export default SpeakerContacts
