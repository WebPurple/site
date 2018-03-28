import React from 'react'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import EventsFeed from '../components/events-page/events-feed'

let EventsPage = ({ data: { allEventYaml: { edges: events } } }) => (
  <React.Fragment>
    <SubscriptionForm />
    <EventsFeed events={events.map(e => e.node)} />
  </React.Fragment>
)

export default EventsPage

export const pageQuery = graphql`
  query AllEvents {
    allEventYaml {
      edges {
        node {
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
    }
  }
`
