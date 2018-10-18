import * as React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import { TagList } from '../common/tag'
import RoundImg from '../round-img'
import { getNoun } from '../../utils/language-utils'

const getCorrectTimeToReadNoun = getNoun('минута', 'минуты', 'минут')

let Card = styled.div`
  box-shadow: 0 0 8px 1px #bbb;
  position: relative;
  overflow: hidden;
`

let Date = styled.time`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.greyishBrown};
`

let StyledLink = styled(Link)`
  font-size: 3.6rem;
  text-decoration: none;
  color: ${({ theme }) => theme.vividPurpleTwo};

  &:hover {
    text-decoration: underline;
  }
`

let Excerpt = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.greyishBrown};
`

let Author = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.greyishBrown};
`

let BackgroundShape = styled.div`
  position: absolute;
  top: 0;
  left: -60%;
  width: 230%;
  height: 100%;
  transform: skew(-60deg, 0);
  overflow: hidden;
  z-index: -1;
`

let BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  filter: grayscale(100);
  opacity: 0.15;
  background: url(${props => props.url}) no-repeat;
  background-size: cover;
  transform: skew(60deg, 0);
  ${({ bgPosX = 0, bgPosY = 0 }) => `
    background-position-x: ${bgPosX}px;
    background-position-y: ${bgPosY}px;
  `};
`

let ArticleCard = ({ post }) => (
  <Box is={Card} p="2.5rem">
    <header>
      <Flex justifyContent="space-between">
        <Date>{format(parse(post.date), 'MMM DD, YYYY')}</Date>
        <Box fontSize="1.4rem">
          &#8986;&nbsp;
          <span>{`${post.timeToRead} ${getCorrectTimeToReadNoun(
            post.timeToRead,
          )}`}</span>
        </Box>
      </Flex>
      <Box is="h2" mt="3.6rem">
        <StyledLink to={post.link}>{post.title}</StyledLink>
      </Box>
    </header>

    <BackgroundShape>
      <BackgroundImage
        url={post.background}
        bgPosX={post.bgPosX}
        bgPosY={post.bgPosY}
      />
    </BackgroundShape>

    <Box is={Excerpt} mt="2.4rem">
      {post.excerpt}
    </Box>

    <footer>
      <Flex
        is={Link}
        my="2.4rem"
        alignItems="center"
        to={post.author.fields.slug.replace('speaker', 'speakers')}>
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
    timeToRead: PropTypes.string,
    link: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }),
}

export default ArticleCard
