import * as React from 'react'
import { mapProps } from 'recompose'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import { DiscussionEmbed } from 'disqus-react'
import canUseDom from 'can-use-dom'
import Helmet from 'react-helmet'

import { TagList } from '../components/common/tag'
import HTMLContent from '../components/blog/HTMLContent'
import RoundImg from '../components/round-img'

let Header = styled.header`
  background-image: linear-gradient(to bottom, #be00ff, #6200ff);
`

let Heading = styled.h1`
  font-family: Rubik, sans-serif;
  color: #fff;
`

let Oxigen = styled.span`
  font-family: Oxigen, sans-serif;
`

let BlogPost = ({ post }) => (
  <div itemScope itemType="http://schema.org/TechArticle">
    <Helmet title={post.title}>
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.author} />
      {post.tags.map(tag => <meta property="article:tag" content={tag} />)}
      <meta
        property="og:image"
        content="https://webpurple.net/img/social-thumbnail-bg.png"
      />
    </Helmet>

    <Box is={Header} p={['3.2rem 2rem', '3.2rem 2rem', '9.6rem 12rem']}>
      <TagList tags={post.tags} itemProp="keywords" />
      <Flex alignItems="center" my={['3.2rem', '4.8rem']}>
        <RoundImg size="6rem" bg="/img/3a10409e4afd745b080502e5fb10df93.jpg" />

        <Flex flexDirection="column" color="white" ml="1.6rem">
          <Box
            is={Oxigen}
            fontSize={['1.8rem', '2.4rem']}
            mb=".8rem"
            itemProp="author">
            {post.author}
          </Box>

          <Box
            is={Oxigen}
            fontSize={['1.4rem', '1.6rem']}
            itemProp="dateCreated">
            {new Date(post.date).toLocaleString()}
          </Box>
        </Flex>
      </Flex>

      <Box
        is={Heading}
        m={0}
        fontSize={['3.2rem', '6.4rem', '7.8rem']}
        itemProp="name">
        {post.title}
      </Box>
    </Box>

    <Flex justifyContent="center" px={['2rem', '2rem', 0]}>
      <Box w={['100%', '958px']}>
        <HTMLContent itemProp="articleBody">{post.content}</HTMLContent>

        <Box mt={['1rem', '1rem', '5rem']}>
          <DiscussionEmbed
            shortname="WebPurple"
            config={{
              url: canUseDom
                ? window.location.href
                : `https://www.webpurple.net${post.slug}`,
              identifier: post.slug,
              title: post.title,
            }}
          />
        </Box>
      </Box>
    </Flex>
  </div>
)

export default mapProps(({ data }) => ({
  post: {
    ...data.markdownRemark.frontmatter,
    content: data.markdownRemark.html,
    excerpt: data.markdownRemark.excerpt,
    slug: data.markdownRemark.fields.slug,
  },
}))(BlogPost)

export let pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
`
