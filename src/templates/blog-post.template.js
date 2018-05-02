import * as React from 'react'
import { mapProps } from 'recompose'

let BlogPost = ({ post }) => (
  <React.Fragment>
    <h1>{post.title}</h1>
    <strong>{post.author} ({new Date(post.date).toLocaleString()})</strong>
    <div dangerouslySetInnerHTML={{ __html:post.content }} />
  </React.Fragment>
)

export default mapProps(({ data }) => ({
  post: {
    ...data.markdownRemark.frontmatter,
    content: data.markdownRemark.html,
  },
}))(BlogPost)

export let pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
        author
        tags
      }
    }
  }
`
