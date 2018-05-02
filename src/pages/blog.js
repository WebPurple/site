import React from 'react'
import Link from 'gatsby-link'
import { Flex } from 'grid-styled'

export default ({ data: { allMarkdownRemark: { edges: posts } } }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    my="5rem"
    fontSize={'2.4rem'}>
    <h1>Blog</h1>
    {posts
      .map(p => ({
        ...p.node,
        ...p.node.frontmatter,
      }))
      .map(post => (
        <article key={post.id}>
          <header>
            <h2>{post.title}</h2>
            <span>
              {post.author} - {new Date(post.date).toLocaleString()}
            </span>
          </header>
          <ul>{post.tags.map(t => <li key={t}>#{t}</li>)}</ul>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />

          <Link to={post.fields.slug}>Read more -></Link>
        </article>
      ))}
  </Flex>
)

export let pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            tags
          }
        }
      }
    }
  }
`
