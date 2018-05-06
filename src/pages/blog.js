import React from 'react'
import { mapProps } from 'recompose'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import Helmet from 'react-helmet'
import Masonry from 'react-masonry-component'

import BlockHeader from '../components/common/block-header'
import MainContainer from '../components/common/main-container'
import { isTablet, Media } from '../utils/css-utils'
import ArticleCard from '../components/blog/article-card'

const AdaptiveList = styled(({ children, className }) => {
  return (
    <Media.MobileOnly>
      {isMobile =>
        isMobile ? (
          <ul className={className}>{children}</ul>
        ) : (
          <Masonry
            className={className}
            elementType="ul"
            option
            s={{ gutter: isTablet() ? 30 : 75, fitWidth: true }}>
            {children}
          </Masonry>
        )
      }
    </Media.MobileOnly>
  )
})`
  list-style: none;
  padding: 0;
`

let BlogPage = ({ posts }) => (
  <MainContainer>
    <Helmet title="Blog">
      <meta />
    </Helmet>

    <BlockHeader size="h1">Blog</BlockHeader>

    <AdaptiveList>
      {posts.map(post => (
        <Box
          is="li"
          key={post.id}
          width={['100%', '30rem', '35rem']}
          mb={['2rem', '2rem', '7rem']}>
          <ArticleCard post={post} />
        </Box>
      ))}
    </AdaptiveList>
  </MainContainer>
)

export default mapProps(({ data: { allMarkdownRemark: { edges } } }) => ({
  posts: edges.map(p => ({
    ...p.node,
    ...p.node.frontmatter,
    link: p.node.fields.slug,
  })),
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
