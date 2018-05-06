import * as React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import { TagList } from '../common/tag'
import RoundImg from '../round-img'

let Card = styled.div`
  box-shadow: 0 0 8px 1px #bbb;
`

let Date = styled.time`
  font-family: Oxygen, sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.greyishBrown};
`

let StyledLink = styled(Link)`
  font-family: Rubik, sans-serif;
  font-size: 3.6rem;
  text-decoration: none;
  color: ${({ theme }) => theme.vividPurpleTwo};

  &:hover {
    text-decoration: underline;
  }
`

let Excerpt = styled.p`
  font-family: Oxygen, sans-serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.greyishBrown};
`

let Author = styled.div`
  font-family: Oxygen, sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.greyishBrown};
`

let ArticleCard = ({ post }) => (
  <Box is={Card} p="2.5rem">
    <header>
      <Date>{moment(post.date).format('ll')}</Date>
      <Box is="h2" mt="3.6rem">
        <StyledLink to={post.link}>{post.title}</StyledLink>
      </Box>
    </header>
    <Box is={Excerpt} mt="2.4rem">
      {post.excerpt}
    </Box>
    <footer>
      <Flex my="2.4rem" alignItems="center">
        <RoundImg size="3.6rem" bg={post.author.avatar} />
        <Box is={Author} ml="1.2rem">
          {post.author.title}
        </Box>
      </Flex>
      <TagList tags={post.tags} />
    </footer>
  </Box>
)

ArticleCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }),
}

export default ArticleCard
