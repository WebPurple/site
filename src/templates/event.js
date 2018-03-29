import React from 'react'
import EventPage from '../components/event-page/event-page'

let Event = ({ data: { eventYaml } }) => <EventPage event={eventYaml} />

export default Event

export const pageQuery = graphql`
  query Event {
    eventYaml(title: { eq: "Meetup #1" }) {
      title
      description
      date
      address
      talks {
        title
        speaker
      }
    }
  }
`
