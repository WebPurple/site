// @flow
import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'

import Layout from '../components/layout'
import SpeakerPage from '../components/speaker-page'
import type { ISpeaker, ITalk, ISocialNetwork } from '../model'

interface IRawSpeaker {
  title: string;
  avatar: string;
  jobTitle: string | null;
  organization: string | null;
  socialNetworks: Array<ISocialNetwork>;

  fields: {
    talks: Array<ITalk>,
  };
}

const Speaker = ({ speaker }: { speaker: ISpeaker }) => {
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
    data: { speakerYaml: IRawSpeaker },
  }) => ({
    speaker: {
      ...speaker,
      ...fields,
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
