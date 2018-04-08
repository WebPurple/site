import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { media } from '../../utils/css-utils'
import SpeakerContacts from '../common/speaker-contacts'
import Avatar from '../common/avatar'

const Card = styled.div`
  display: flex;
  padding: 0 0 3.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  ${media.desktop`
        text-align: left;
        padding-left: 3.5rem;
    `};
`

const speakerLinkHover = color => `
    position: relative;
    display: inline-block;
    
    &:hover {
        color: ${color}; 
    }
    
    &:after {
        width: 0;
        height: 0.2rem;
        display: block;
        position: absolute;
        left: 50%;
        content: '';
        background: ${color};
        transition: all 0.2s ease-in-out;
    }

    &:hover:after {
        left: 0;
        width: 100%;
    }
`

const SpeakerInitials = styled.a`
  margin: 0;
  text-decoration: none;
  font-family: Rubik, 'sans-serif';
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.13;
  color: ${props => props.theme.greyishBrown};
  ${props => speakerLinkHover(props.theme.greyishBrown)};
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
  ${media.desktop`justify-content: flex-start;`};
`

const TalksWrapper = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 2;
  top: calc(100% + 1rem);
  left: 0;
  transition: opacity 0.3s;
`

const CountOfTalks = styled.span`
  position: relative;
  margin-left: 1.5rem;
  text-decoration: none;
  font-family: Oxygen, 'sans-serif';
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.lipstick};
  ${props => speakerLinkHover(props.theme.lipstick)};

  &:hover {
    ${TalksWrapper} {
      visibility: visible;
      opacity: 1;
    }
  }
`

const Talks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  font-family: 'Oxygen', sans-serif;
  font-weight: normal;
  font-size: 1.6rem;
  color: ${props => props.theme.greyishBrown};
`

let Talk = styled.li`
  white-space: nowrap;
  margin: 0.5rem 0;
`

const SpeakerCard = ({ speaker }) => (
  <Card>
    <SpeakerAvatarContainer>
      <Avatar avatar={speaker.avatar} />
    </SpeakerAvatarContainer>
    <SpeakerInfoContainer>
      <SpeakerInitials href="#">{speaker.title}</SpeakerInitials>
      <SpeakerDescription>{speaker.jobTitle}</SpeakerDescription>
      <SpeakerAdditionalContainer>
        <SpeakerContacts speaker={speaker} />
        {speaker.talks &&
          speaker.talks.length > 0 && (
            <CountOfTalks>
              {speaker.talks.length} talks
              <TalksWrapper>
                <Talks>
                  {speaker.talks.map(talk => (
                    <Talk key={talk.title}>— {talk.title}</Talk>
                  ))}
                </Talks>
              </TalksWrapper>
            </CountOfTalks>
          )}
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
