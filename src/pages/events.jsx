import React from 'react'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import EventsFeed from '../components/events-page/events-feed'

let EventsPage = ({
  data: {
    allEventYaml: { edges: events },
  },
  location,
}) => (
  <React.Fragment>
    <SubscriptionForm />
    <EventsFeed events={events.map(e => e.node)} location={location} />
  </React.Fragment>
)

export default EventsPage

export let pageQuery = graphql`
  query AllEvents {
    allEventYaml(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          title
          description
          date
          address
          talks {
            title
            description
            speaker
            tags
          }
        }
      }
    }
  }
`
