import React from 'react'

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
