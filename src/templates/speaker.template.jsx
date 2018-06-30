// @flow
import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SpeakerPage from '../components/speaker-page'
import type { ISpeaker } from '../model'

const Speaker = ({
  data: { speakerYaml },
}: {
  data: { speakerYaml: ISpeaker },
}) => {
  return (
    <Layout>
      <SpeakerPage speaker={speakerYaml} />
    </Layout>
  )
}

export default Speaker

export let pageQuery = graphql`
  query SpeakerPage($id: String!) {
    speakerYaml(id: { eq: $id }) {
      title
    }
  }
`
