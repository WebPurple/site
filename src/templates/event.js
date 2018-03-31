import React from 'react'
import EventPage from '../components/event-page/event-page'

let Event = ({ data: { eventYaml } }) => <EventPage event={eventYaml} />

export default Event

export let pageQuery = graphql`
  query Event($id: String) {
    eventYaml(id: { eq: $id }) {
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
