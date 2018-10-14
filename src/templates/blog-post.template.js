import * as React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import { DiscussionEmbed } from 'disqus-react'
import canUseDom from 'can-use-dom'
import Helmet from 'react-helmet'
import moment from 'moment'
import VK, { Like as VkLike } from 'react-vk'
import { FacebookProvider, Like as FbLike } from 'react-facebook'

import { TagList } from '../components/common/tag'
import HTMLContent from '../components/blog/HTMLContent'
import RoundImg from '../components/round-img'
import { BrowserOnly } from '../utils/css-utils'
import Layout from '../components/layout'
import { getNoun } from '../utils/language-utils'

const getCorrectTimeToReadNoun = getNoun('минута', 'минуты', 'минут')

let Header = styled.header`
  background-blend-mode: overlay;
  background: #c788fe
    url(${({ cover }) => cover || '/img/social-thumbnail-bg.png'});
  background-size: cover;
`

let Heading = styled.h1`
  color: #fff;
`

let BlogPost = ({ post }) => (
  <Layout>
    <div itemScope itemType="http://schema.org/TechArticle">
      <Helmet title={post.title}>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta
          property="og:image"
          content={`https://webpurple.net${post.background ||
            '/img/social-thumbnail-bg.png'}`}
        />
      </Helmet>

      <Box
        is={Header}
        p={['3.2rem 2rem', '3.2rem 2rem', '9.6rem 12rem']}
        cover={post.background}>
        <TagList tags={post.tags} itemProp="keywords" />
        <Flex alignItems="center" my={['3.2rem', '4.8rem']}>
          <RoundImg size="6rem" bg={post.author.avatar} />

          <Flex flexDirection="column" color="white" ml="1.6rem">
            <Box fontSize={['1.8rem', '2.4rem']} mb=".8rem" itemProp="author">
              {post.author.title}
            </Box>

            <Box fontSize={['1.4rem', '1.6rem']} itemProp="dateCreated">
              {moment(post.date).format('LLL')}
            </Box>
            <Box fontSize="1.4rem">
              &#8986;&nbsp;
              <span>{`${post.timeToRead} ${getCorrectTimeToReadNoun(
                post.timeToRead,
              )}`}</span>
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
        <Box width={['100%', '100%', '958px']}>
          <HTMLContent itemProp="articleBody">{post.content}</HTMLContent>

          <BrowserOnly>
            <Flex alignItems="center" justifyContent="flex-end" my="2rem">
              <VK apiId={5360165} options={{ version: 152 }}>
                <VkLike
                  options={{ type: 'mini', height: 30 }}
                  pageId={post.slug}
                />
              </VK>

              <FacebookProvider appId="1094823327247465">
                <FbLike layout="button_count" share />
              </FacebookProvider>
            </Flex>
          </BrowserOnly>

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
  </Layout>
)

export default mapProps(({ data: { markdownRemark } }) => ({
  post: {
    ...markdownRemark.frontmatter,
    content: markdownRemark.html,
    excerpt: markdownRemark.excerpt,
    slug: markdownRemark.fields.slug,
    author: markdownRemark.fields.author,
    timeToRead: markdownRemark.timeToRead,
  },
}))(BlogPost)

export let pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      timeToRead
      html
      excerpt(pruneLength: 400)
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
      }
    }
  }
`
