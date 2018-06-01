import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from '../../utils/css-utils'
import hoverLink from '../../utils/hover-link'

const CountOfTalks = styled.span`
  text-decoration: none;
  font-family: Oxygen, 'sans-serif';
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.lipstick};
  ${props => hoverLink(props.theme.lipstick)};
`

const TalksWrapper = styled.div`
  clip: rect(0 0 0 0);
  background: #ffffff;
  z-index: 2;
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  right: 0;
  transition: opacity 0.3s;
  overflow: hidden;
  padding: 0.4rem;
  ${media.desktop`
    right: auto;
  `};
`

const TalksContainer = styled.div`
  margin-left: 1.5rem;

  ${media.desktop`
    position: relative;
  `};
  &:hover {
    ${TalksWrapper} {
      clip: initial;
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
  margin: 0.5rem 0;
  ${media.desktop`
    white-space: nowrap;
  `};
`

const SpeakerTalks = ({ talks }) => {
  if (talks === void 0 || talks.length === 0) {
    return null
  }
  return (
    <TalksContainer>
      <CountOfTalks>
        {talks.length} {talks.length > 1 ? 'talks' : 'talk'}
      </CountOfTalks>
      <TalksWrapper>
        <Talks>
          {talks.map(talk => <Talk key={talk.title}>— {talk.title}</Talk>)}
        </Talks>
      </TalksWrapper>
    </TalksContainer>
  )
}

SpeakerTalks.propTypes = {
  talks: PropTypes.array,
}

export default SpeakerTalks
