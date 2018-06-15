import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'

let defaultAngle = 30
let sinusAngle = Math.sin(((90 - defaultAngle) / 180) * Math.PI)
let width = 32
let height = width / sinusAngle

/* descriptionTop for the defaultAngle 30 */
let descriptionTop = height / 4

let Diamond = styled.div`
  display: block;
  transform: skewY(
    ${props => (props.isTurnLeft ? defaultAngle : -defaultAngle)}deg
  );

  font-family: 'Rubik', sans-serif;
  padding: 0 3rem;
  color: white;
  position: relative;
  top: ${descriptionTop}rem;
  z-index: 1;
`

let EventName = styled(Link)`
  font-size: 1.8rem;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`

let TalkTitle = styled(Link)`
  font-size: 2.8rem;
  font-weight: bold;
  margin: 1.8rem 0;
  text-decoration: none;
  color: #fff;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 10rem;
  cursor: pointer;
`

let Speaker = styled.div`
  display: flex;
  align-items: center;
`

let SpeakerPhoto = styled.div`
  background-image: url(${props => props.src});
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-size: cover;
`

let SpeakerName = styled.div`
  padding-left: 1.8rem;
  font-size: 1.8rem;
  font-family: 'Oxygen', sans-serif;
`

let EventDiamond = ({ isTurnLeft, talk: { title, event, speaker } }) => (
  <Diamond isTurnLeft={isTurnLeft}>
    <EventName to={event.fields.slug}>{event.title}</EventName>
    <TalkTitle to={event.fields.slug}>{title}</TalkTitle>
    <Speaker>
      <SpeakerPhoto src={speaker.avatar} />
      <SpeakerName>{speaker.title}</SpeakerName>
    </Speaker>
  </Diamond>
)

EventDiamond.propTypes = {
  talk: PropTypes.shape({
    title: PropTypes.string.isRequired,
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    speaker: PropTypes.shape({
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

export default EventDiamond
