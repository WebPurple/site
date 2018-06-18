import React from 'react'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import EventsFeed from '../components/events-page/events-feed'
import Layout from '../components/layout'

let EventsPage = ({
  data: {
    allEventYaml: { edges: events },
  },
}) => (
  <Layout>
    <SubscriptionForm />
    <EventsFeed events={events.map(e => e.node)} />
  </Layout>
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
