import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { lifecycle } from 'recompose'

const IndexPage = ({ data: { allMarkdownRemark: { edges: events } } }) => (
  <div>
    <ul>{events.map(e => <li>{JSON.stringify(e)}</li>)}</ul>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
