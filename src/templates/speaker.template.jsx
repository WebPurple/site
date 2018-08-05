// @flow
import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'

import Layout from '../components/layout'
import SpeakerPage from '../components/speaker-page'
import type { RawSpeakerType, SpeakerType } from '../model'

const Speaker = ({ speaker }: { speaker: SpeakerType }) => {
  return (
    <Layout>
      <SpeakerPage speaker={speaker} />
    </Layout>
  )
}

export default mapProps(
  ({
    data: {
      speakerYaml: { fields, ...speaker },
    },
  }: {
    data: { speakerYaml: RawSpeakerType },
  }) => ({
    speaker: {
      ...speaker,
      ...fields,
      fields,
    },
  }),
)(Speaker)

export let pageQuery = graphql`
  query SpeakerPage($id: String!) {
    speakerYaml(id: { eq: $id }) {
      title
      avatar
      jobTitle
      organization

      socialNetworks {
        type
        link
      }

      fields {
        talks {
          title
          links {
            video
            presentation
          }
          event {
            slug
            date
          }
        }
      }
    }
  }
`
