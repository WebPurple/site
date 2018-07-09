import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'
import Helmet from 'react-helmet'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import UpcomingEvents from '../components/home-page/upcoming-events-block'
import PastEvents from '../components/home-page/past-events'
import SocialLinksBlock from '../components/social-links-block'
import { selectNearestEvent, selectPastEvents } from '../utils/selectors'
import { HiddenText } from '../utils/accessibility'
import Layout from '../components/layout'

const IndexPage = ({ upcomingEvent, pastTalks }) => (
  <Layout>
    <Helmet title="Home" />
    <HiddenText>
      <h1>Home</h1>
    </HiddenText>
    {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
    <PastEvents talks={pastTalks} />
    <SubscriptionForm />
    <SocialLinksBlock />
  </Layout>
)

export default mapProps(
  ({
    data: {
      allEventYaml: { edges: allEventNodes },
    },
  }) => {
    let extendTalk = event => talk => ({ ...talk, event })

    let pastTalks = selectPastEvents(allEventNodes).reduce(
      (arr, event) => [...arr, ...event.fields.talks.map(extendTalk(event))],
      [],
    )

    let upcomingEvent = selectNearestEvent(allEventNodes)
    return {
      upcomingEvent: upcomingEvent && {
        ...upcomingEvent,
        talks: upcomingEvent.fields.talks.map(extendTalk(upcomingEvent)),
      },
      pastTalks,
    }
  },
)(IndexPage)

export const pageQuery = graphql`
  query IndexQuery {
    allEventYaml(sort: { fields: [date], order: DESC }) {
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
                organization
                jobTitle
                socialNetworks {
                  type
                  link
                }
              }
            }
          }
          title
          description
          date
          address
        }
      }
    }
  }
`
