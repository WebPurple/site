import React from 'react'
import { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    font-size: .625em; /* 10px; */
  }
`

const IndexPage = props => (
  <div>
    <ul>{JSON.stringify(props)}</ul>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allEventYaml {
      edges {
        node {
          title
          description
          date
          talks {
            title
            speaker
          }
        }
      }
    }
  }
`
