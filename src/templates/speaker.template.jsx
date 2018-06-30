import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SpeakerPage from '../components/speaker-page'

const Speaker = ({ data: { speakerYaml } }) => {
  return (
    <Layout>
      <SpeakerPage speaker={console.log(speakerYaml) || speakerYaml} />
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
