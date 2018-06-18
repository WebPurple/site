import React from 'react'
import { mapProps } from 'recompose'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import SpeakersList from '../components/speakers-list/speakers-list'
import Layout from '../components/layout'

let SpeakersPage = ({ speakers }) => (
  <Layout>
    <SubscriptionForm />
    <SpeakersList speakers={speakers} />
  </Layout>
)

export default mapProps(
  ({
    data: {
      allSpeakerYaml: { edges: allUsers },
    },
  }) => ({
    speakers: allUsers.map(s => ({
      ...s.node,
      talks: s.node.fields.talks,
    })),
  }),
)(SpeakersPage)

export const pageQuery = graphql`
  query AllSpeakers {
    allSpeakerYaml(
      sort: { fields: fields___talksCount, order: DESC }
      filter: { fields: { talksCount: { gt: 0 } } }
    ) {
      edges {
        node {
          fields {
            talks {
              title
            }
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
  }
`
