import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import hoverLink from '../../utils/hover-link'
import SpeakerContacts from '../common/speaker-contacts'
import Avatar from '../common/avatar'
import SpeakerTalks from '../speaker-talks/speaker-talks'
import { media } from '../../utils/css-utils'

// TODO: shity Avatar
let FixAvatarHeight = styled.div`
  height: 200px;
`

let Name = styled(Link)`
  text-align: center;
  text-decoration: none;
  font-family: Rubik, 'sans-serif';
  font-weight: bold;
  color: ${props => props.theme.greyishBrown};
  ${props => hoverLink(props.theme.greyishBrown)};
`

let Position = styled.div`
  color: ${props => props.theme.grape};
  text-align: center;
  ${media.desktop`text-align: left`};
`

let SpeakerCard = ({ speaker }) => (
  <Flex
    width={[1, 1 / 2]}
    flexDirection={['column', 'column', 'row']}
    alignItems={['center', 'center', 'flex-start']}
    justifyContent={['flex-start']}
    my={['20px', '35px']}>
    <Box is={FixAvatarHeight} pb={['20px', 0]}>
      <LazyLoad once>
        <Avatar avatar={speaker.avatar} />
      </LazyLoad>
    </Box>

    <Flex
      flexDirection="column"
      alignItems={['center', 'flex-start']}
      pl={[0, '35px']}>
      <Box
        is={Name}
        to={speaker.slug.replace('speaker', 'speakers')}
        href="#"
        fontSize={['24px', '32px']}>
        {speaker.title}
      </Box>

      <Box is={Position} pt="10px" pb="25px" fontSize={['16px', '22px']}>
        {speaker.jobTitle}
        {speaker.jobTitle && speaker.organization && ' - '}
        {speaker.organization}
      </Box>

      <Flex justifyContent={['center', 'center', 'flex-start']}>
        <SpeakerContacts speaker={speaker} />
        <SpeakerTalks talks={speaker.talks} />
      </Flex>
    </Flex>
  </Flex>
)

SpeakerCard.propTypes = {
  speaker: PropTypes.shape({
    slug: PropTypes.string,
    avatar: PropTypes.string,
    title: PropTypes.string,
    jobTitle: PropTypes.string,
    organization: PropTypes.string,
    talks: PropTypes.arrayOf(String),
  }),
}

export default SpeakerCard
