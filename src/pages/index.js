import React from 'react'
import { injectGlobal } from 'styled-components'
import { mapProps } from 'recompose'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import UpcomingEvents from '../components/home-page/upcoming-events-block'
import PastEvents from '../components/home-page/past-events'
import SocialLinks from '../components/event-page/social-links'

injectGlobal`
  html {
    font-size: .625em; /* 10px; */
  }
`

const IndexPage = ({ upcomingEvent, pastTalks }) => (
  <React.Fragment>
    {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
    <PastEvents talks={pastTalks} />
    <SubscriptionForm />
    <SocialLinks />
  </React.Fragment>
)

export default mapProps(
  ({
    data: {
      allEventYaml: { edges: allEventNodes },
      allSpeakerYaml: { edges: allSpeakers },
    },
  }) => {
    let allEvents = allEventNodes.map(e => e.node)
    let upcomingEvent = allEvents.find(e => new Date(e.date) > new Date())
    let pastEvents = allEvents.filter(e => new Date(e.date) < new Date())
    let speakerByTitleMap = allSpeakers.reduce(
      (map, speaker) => map.set(speaker.node.title, speaker.node),
      new Map(),
    )
    let pastTalks = pastEvents.reduce(
      (arr, event) => [
        ...arr,
        ...event.talks.map(talk => ({
          ...talk,
          event,
          speaker: speakerByTitleMap.get(talk.speaker),
        })),
      ],
      [],
    )

    return {
      upcomingEvent,
      pastTalks,
    }
  },
)(IndexPage)

export const pageQuery = graphql`
  query IndexQuery {
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

    allSpeakerYaml {
      edges {
        node {
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
  }
`
