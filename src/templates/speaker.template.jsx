// @flow
import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'

import Layout from '../components/layout'
import SpeakerPage from '../components/speaker-page'
import type { SpeakerType, TalkType, SocialNetworkType } from '../model'

interface IRawSpeaker {
  title: string;
  avatar: string;
  jobTitle: string | null;
  organization: string | null;
  socialNetworks: Array<SocialNetworkType>;

  fields: {
    talks: Array<TalkType>,
  };
}

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
