import React from 'react'
import { mapProps } from 'recompose'
import { chain, comparator, groupBy, path, pipe, prop } from 'ramda'

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
    let talksBySpeaker = pipe(
      chain(path(['node', 'talks'])),
      groupBy(prop('speaker')),
    )(allEvents)

    let speakers = allUsers
      .filter(s => talksBySpeaker.hasOwnProperty(s.node.title))
      .map(s => ({
        ...s.node,
        talks: talksBySpeaker[s.node.title],
      }))
      .sort(comparator((s1, s2) => s1.talks.length > s2.talks.length))

    return { speakers }
  },
)(SpeakersPage)

export const pageQuery = graphql`
  query AllSpeakers {
    allEventYaml {
      edges {
        node {
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
