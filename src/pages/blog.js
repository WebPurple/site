import React from 'react'
import { mapProps } from 'recompose'
import { Box, Flex } from 'grid-styled'
import Helmet from 'react-helmet'

import BlockHeader from '../components/common/block-header'
import MainContainer from '../components/common/main-container'
import ArticleCard from '../components/blog/article-card'
import AdaptiveMasonryList from '../components/adaptive-masonry-list'

let BlogPage = ({ posts }) => (
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
)

export default mapProps(
  ({
    data: { allMarkdownRemark: { edges }, allSpeakerYaml: { edges: speakers } },
  }) => ({
    posts: edges.map(p => ({
      ...p.node,
      ...p.node.frontmatter,
      link: p.node.fields.slug,
      author: speakers.find(
        speaker => speaker.node.title === p.node.frontmatter.author,
      ).node,
    })),
  }),
)(BlogPage)

// TODO: find out how to query relation data
export let pageQuery = graphql`
  query AllPosts {
    allSpeakerYaml {
      edges {
        node {
          title
          avatar
        }
      }
    }

    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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
