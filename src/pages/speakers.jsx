import React from 'react'
import { mapProps } from 'recompose'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import SpeakersList from '../components/speakers-list/speakers-list'

let SpeakersPage = ({ speakers }) => (
  <React.Fragment>
    <SubscriptionForm />
    <SpeakersList speakers={speakers} />
  </React.Fragment>
)

export default mapProps(
  ({
    data: {
      allEventYaml: { edges: allEvents },
      allSpeakerYaml: { edges: allUsers },
    },
  }) => {
    const speakerNames = allEvents.reduce(
      (arr, event) => [...arr, ...event.node.talks.map(talk => talk.speaker)],
      [],
    )
    const speakerNamesSet = new Set(speakerNames)

    let speakers = allUsers.map(s => s.node).filter(s => speakerNamesSet.has(s.title))
    return { speakers }
  },
)(SpeakersPage)

export const pageQuery = graphql`
  query AllSpeakers {
    allEventYaml {
      edges {
        node {
          talks {
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
