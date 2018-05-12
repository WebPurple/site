import React from 'react'
import { injectGlobal } from 'styled-components'
import { mapProps } from 'recompose'
import Helmet from 'react-helmet'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import UpcomingEvents from '../components/home-page/upcoming-events-block'
import PastEvents from '../components/home-page/past-events'
import SocialLinksBlock from '../components/social-links-block'
import { selectNearestEvent, selectPastEvents } from '../utils/selectors'
import { HiddenText } from '../utils/accessibility'

injectGlobal`
  html {
    font-size: .625em; /* 10px; */
  }
  html, body {
    margin: 0;
    padding: 0;
  }
`

const IndexPage = ({ upcomingEvent, pastTalks }) => (
  <React.Fragment>
    <Helmet title="Home" />
    <HiddenText>
      <h1>Home</h1>
    </HiddenText>
    {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
    <PastEvents talks={pastTalks} />
    <SubscriptionForm />
    <SocialLinksBlock />
  </React.Fragment>
)

export default mapProps(
  ({
    data: {
      allEventYaml: { edges: allEventNodes },
      allSpeakerYaml: { edges: allSpeakers },
    },
  }) => {
    let speakerByTitleMap = allSpeakers.reduce(
      (map, speaker) => map.set(speaker.node.title, speaker.node),
      new Map(),
    )

    let extendTalk = event => talk => ({
      ...talk,
      event: event,
      speaker: speakerByTitleMap.get(talk.speaker),
    })

    let pastTalks = selectPastEvents(allEventNodes).reduce(
      (arr, event) => [...arr, ...event.talks.map(extendTalk(event))],
      [],
    )

    let upcomingEvent = selectNearestEvent(allEventNodes)
    return {
      upcomingEvent: upcomingEvent && {
        ...upcomingEvent,
        talks: upcomingEvent.talks.map(extendTalk(upcomingEvent)),
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
          }
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
