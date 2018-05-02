import React from 'react'
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
        ...p.node.frontmatter,
        id: p.node.id,
        content: p.node.html,
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
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
          html
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
