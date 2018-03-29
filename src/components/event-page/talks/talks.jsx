import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './../../../utils/css-utils'
import EventTalk from './talk'

const TalksGrid = styled.div`
  column-count: 1;
  column-fill: balance;
  column-gap: 12px;
  margin-top: 6.4rem;
  margin-bottom: ${props => (props.talksCount % 2 > 0 ? ' 6.4rem' : '0')};

  ${media.desktop`
        column-count: 2;
    `};
`

const EventTalks = ({ talks }) => (
  <TalksGrid talksCount={talks.length}>
    {talks.map(talk => <EventTalk key={talk.title} talk={talk} />)}
  </TalksGrid>
)

EventTalks.propTypes = {
  talks: PropTypes.array.isRequired,
}

export default EventTalks
