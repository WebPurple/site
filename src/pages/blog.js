import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'
import { Box } from 'grid-styled'
import Helmet from 'react-helmet'

import BlockHeader from '../components/common/block-header'
import MainContainer from '../components/common/main-container'
import ArticleCard from '../components/blog/article-card'
import AdaptiveMasonryList from '../components/adaptive-masonry-list'
import Layout from '../components/layout'

let BlogPage = ({ posts }) => (
  <Layout>
    <MainContainer>
      <Helmet title="Blog" />

      <BlockHeader size="h1">Blog</BlockHeader>

      <AdaptiveMasonryList>
        {posts.map(post => (
          <Box
            is="li"
            key={post.id}
            width={['100%', '30rem', '35rem']}
            mb={['2rem', '2rem', '7rem']}>
            <ArticleCard post={post} />
          </Box>
        ))}
      </AdaptiveMasonryList>
    </MainContainer>
  </Layout>
)

export default mapProps(({ data: { allMarkdownRemark: { edges } } }) => ({
  posts: edges
    .map(p => ({
      ...p.node,
      ...p.node.frontmatter,
      link: p.node.fields.slug,
      author: p.node.fields.author,
    }))
    .filter(p => !p.draft),
}))(BlogPage)

export let pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
            author {
              title
              avatar
            }
          }
          frontmatter {
            title
            date
            tags
            background
            bgPosX
            bgPosY
            draft
          }
        }
      }
    }
  }
`
