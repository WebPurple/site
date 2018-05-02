import * as React from 'react'
import { mapProps } from 'recompose'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { TagList } from '../components/common/tag'

let Header = styled.header`
  background-image: linear-gradient(to bottom, #be00ff, #6200ff);
`

let Heading = styled.h1`
  font-family: Rubic, sans-serif;
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
  line-height: 4.2rem;
  color: ${({ theme }) => theme.greyishBrown};

  h2 {
    font-family: Rubic, sans-serif;
    font-size: 3.6rem;
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
      <Box w={['100%', '1078px']}>
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </Flex>
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
