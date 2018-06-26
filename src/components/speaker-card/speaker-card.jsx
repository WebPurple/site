import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import styled from 'styled-components'

import { media } from '../../utils/css-utils'
import hoverLink from '../../utils/hover-link'
import SpeakerContacts from '../common/speaker-contacts'
import Avatar from '../common/avatar'
import SpeakerTalks from '../speaker-talks/speaker-talks'

const Card = styled.div`
  display: flex;
  padding: 0 0 3.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  ${media.desktop`
        width: 50%;
        padding: 3.5rem 0;
        flex-direction: row; 
        align-items: flex-start;
    `};
`

const SpeakerAvatarContainer = styled.div`
  width: 12rem;
  height: 20rem;
  padding-bottom: 2rem;
  ${media.desktop`padding-bottom: 0;`};
`

const SpeakerInfoContainer = styled.div`
  text-align: center;
  width: 100%;
  ${media.desktop`
        text-align: left;
        padding-left: 3.5rem;
        width: auto;
    `};
`

const SpeakerInitials = styled.a`
  margin: 0;
  text-decoration: none;
  font-family: Rubik, 'sans-serif';
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.13;
  color: ${props => props.theme.greyishBrown};
  ${props => hoverLink(props.theme.greyishBrown)};
`

const SpeakerDescription = styled.p`
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  font-family: Oxygen, 'sans-serif';
  font-size: 2.2rem;
  color: ${props => props.theme.grape};
`

const SpeakerAdditionalContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  ${media.desktop`justify-content: flex-start;`};
`

const SpeakerCard = ({ speaker }) => (
  <Card>
    <SpeakerAvatarContainer>
      <LazyLoad once>
        <Avatar avatar={speaker.avatar} />
      </LazyLoad>
    </SpeakerAvatarContainer>
    <SpeakerInfoContainer>
      <SpeakerInitials href="#">{speaker.title}</SpeakerInitials>
      <SpeakerDescription>{speaker.jobTitle}</SpeakerDescription>
      <SpeakerAdditionalContainer>
        <SpeakerContacts speaker={speaker} />
        <SpeakerTalks talks={speaker.talks} />
      </SpeakerAdditionalContainer>
    </SpeakerInfoContainer>
  </Card>
)

SpeakerCard.propTypes = {
  speaker: PropTypes.shape({
    avatar: PropTypes.string,
    title: PropTypes.string,
    jobTitle: PropTypes.string,
    talks: PropTypes.array,
  }),
}

export default SpeakerCard
