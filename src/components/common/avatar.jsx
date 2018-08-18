// @flow
import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import Img from 'gatsby-image'
import NoAvatarIcon from '../icons/no-avatar-icon'

const avatarForm = styled.div`
  width: 11rem;
  height: 13rem;
  transform-origin: right top;

  transform: skewY(-30deg);
`

const SpeakerAvatar = styled(avatarForm)`
  overflow: hidden;
  position: relative;
  box-shadow: 1.2rem 1.4rem rgba(230, 33, 112, 0.5);
`

const avatarContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  background-size: auto 100%;
  transform: skewY(30deg) translateY(-3.2rem);
`

const AvatarContainer = styled.div`
  ${avatarContainer};
`

const NoAvatarIconElement = styled.div`
  ${avatarContainer} background-color: #efefef;
  transform: skewY(30deg) translateY(-3.5rem);
`

const NoAvatarContainer = () => (
  <NoAvatarIconElement>
    <NoAvatarIcon />
  </NoAvatarIconElement>
)

const Avatar = ({ avatar }: { avatar: ?string }) => (
  <SpeakerAvatar>
    {avatar ? (
      <StaticQuery
        query={graphql`
          query allImages {
            allImageSharp {
              edges {
                node {
                  fixed(width: 200) {
                    originalName
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        `}>
        {({ allImageSharp: { edges } }) => {
          // TODO: avatar should be linked to user in onCreateNode
          let avatarImage = edges.find(i =>
            avatar.includes(i.node.fixed.originalName),
          )

          return avatarImage ? (
            <AvatarContainer>
              <Img fixed={avatarImage.node.fixed} />
            </AvatarContainer>
          ) : (
            <NoAvatarContainer />
          )
        }}
      </StaticQuery>
    ) : (
      <NoAvatarContainer />
    )}
  </SpeakerAvatar>
)

export default Avatar
