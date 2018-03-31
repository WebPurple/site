import React from 'react'
import { mapProps } from 'recompose'
import EventPage from '../components/event-page/event-page'

export default mapProps(
  ({ data: { eventYaml: event, allSpeakerYaml: { edges: allSpeakers } } }) => {
    return {
      event: {
        ...event,
        talks: event.talks.map(talk => ({
          ...talk,
          speaker: allSpeakers.find(s => s.node.title === talk.speaker).node,
        })),
      },
    }
  },
)(EventPage)

export let pageQuery = graphql`
  query Event($id: String) {
    eventYaml(id: { eq: $id }) {
      title
      description
      date
      address
      socialNetworks {
        type
        link
      }
      talks {
        title
        description
        speaker
        tags
      }
    }

    allSpeakerYaml {
      edges {
        node {
          title
          avatar
          jobTitle
        }
      }
    }
  }
`
