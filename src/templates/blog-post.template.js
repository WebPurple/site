import * as React from 'react'
import { mapProps } from 'recompose'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { DiscussionEmbed } from 'disqus-react'
import canUseDom from 'can-use-dom'

import { TagList } from '../components/common/tag'

let Header = styled.header`
  background-image: linear-gradient(to bottom, #be00ff, #6200ff);
`

let Heading = styled.h1`
  font-family: Rubik, sans-serif;
  color: #fff;
`

let Avatar = styled.div`
  background: url(${props => props.background});
  background-position: center;
  background-size: cover;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
`

let Oxigen = styled.span`
  font-family: Oxigen, sans-serif;
`

let Content = styled.div`
  font-family: Oxigen, sans-serif;
  font-size: 2.2rem;
  line-height: 1.58;
  color: ${({ theme }) => theme.greyishBrown};
  margin-top: 2.9rem;

  h2 {
    font-family: Rubik, sans-serif;
    font-size: 3.6rem;
  }

  p,
  ul,
  blockquote {
    margin-top: 3rem;
  }

  ul {
    padding: 0;
    list-style: none;

    li {
      position: relative;
      margin-top: 2.4rem;
      padding-left: 3.6rem;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 1.1rem;
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: ${({ theme }) => theme.lipstick};
      }
    }
  }

  blockquote {
    margin: 0;
    padding-left: 3.6rem;
    border-left: solid 3px #e62270;
    font-style: italic;
  }

  tt,
  code {
    background-color: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono',
      'Liberation Mono', Menlo, Courier, monospace;
    padding: 0.2em 0 0.2em;
    font-size: 1.2rem;
  }

  pre {
    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    line-height: 1.42;
    overflow: auto;
    word-wrap: normal; // So code will scroll on Safari.
    padding: 1.2rem;
  }
  pre code {
    background: none;
    line-height: 1.42;
  }
  // Add space before and after code/tt elements.
  code:before,
  code:after,
  tt:before,
  tt:after {
    letter-spacing: -0.2em;
    content: '\u00A0';
  }

  // But don't add spaces if the code is inside a pre.
  pre code:before,
  pre code:after,
  pre tt:before,
  pre tt:after {
    content: none;
  }
`

let BlogPost = ({ post }) => (
  <React.Fragment>
    <Box is={Header} p={['6rem 2rem', '9.6rem 12rem']}>
      <TagList tags={post.tags} />
      <Flex alignItems="center" my={['3.2rem', '4.8rem']}>
        <Avatar background="/img/3a10409e4afd745b080502e5fb10df93.jpg" />
        <Flex flexDirection="column" color="white" ml="1.6rem">
          <Box is={Oxigen} fontSize={['1.8rem', '2.4rem']} mb=".8rem">
            {post.author}
          </Box>
          <Box is={Oxigen} fontSize={['1.4rem', '1.6rem']}>
            {new Date(post.date).toLocaleString()}
          </Box>
        </Flex>
      </Flex>
      <Box is={Heading} m={0} fontSize={['3.2rem', '7.8rem']}>
        {post.title}
      </Box>
    </Box>

    <Flex justifyContent="center" py="10rem">
      <Box w={['100%', '958px']}>
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />

        <Box mt="10rem">
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
  </React.Fragment>
)

export default mapProps(({ data }) => ({
  post: {
    ...data.markdownRemark.frontmatter,
    content: data.markdownRemark.html,
    slug: data.markdownRemark.fields.slug,
  },
}))(BlogPost)

export let pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
