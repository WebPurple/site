import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import UpcomingEvents from '../components/home-page/upcoming-events-block'
import PastEvents from '../components/home-page/past-events'
import SocialLinksBlock from '../components/social-links-block'
import { selectNearestEvent } from '../utils/selectors'
import { HiddenText } from '../utils/accessibility'
import Layout from '../components/layout'

const HomePage = ({
  data: {
    upcommingEvents: { edges: allEventNodes },
    pastTalks: { edges: pastTalks },
  },
}) => {
  let upcomingEvent = selectNearestEvent(allEventNodes)
  upcomingEvent = upcomingEvent && {
    ...upcomingEvent,
    talks: upcomingEvent.fields.talks.map(talk => ({
      ...talk,
      event: upcomingEvent,
    })),
  }

  return (
    <Layout>
      <Helmet title="Home" />
      <HiddenText>
        <h1>Home</h1>
      </HiddenText>
      {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
      <PastEvents talks={pastTalks.map(t => t.node)} />
      <SubscriptionForm />
      <SocialLinksBlock />
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query IndexQuery {
    upcommingEvents: allEventYaml(
      sort: { fields: [date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
            talks {
              title
              speaker {
                fields {
                  slug
                }
                title
                avatar
              }
            }
          }
          title
          date
          address
        }
      }
    }

    pastTalks: allEventTalk(sort: { fields: date, order: DESC }, limit: 7) {
      edges {
        node {
          title
          speaker {
            fields {
              slug
            }
            id
            avatar
          }
          event {
            fields {
              slug
            }
            title
          }
        }
      }
    }
  }
`
