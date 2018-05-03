import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Avatar from './../../common/avatar'
import { media } from './../../../utils/css-utils'
import { WatchIcon, DownloadIcon } from './../../icons'

const TalkGrid = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
  flex-flow: column nowrap;
  margin-bottom: 6.4rem;
  break-inside: avoid;

  ${media.phone`
        flex-direction: row;    
    `};
`

const AvatarWrapper = styled.div`
    display: block;
    min-width: 12.2rem;
    min-height: 20rem;

    ${media.phone`
        display: inline-block;
        margin-right: 2.7rem;  
    `}
    ${media.tablet`
        margin-right: 3.6rem;
    `}
    ${media.desktop`
        margin-right: 2.4rem;
    `}
`

const Header = styled.h3`
  font-family: Rubik, sans-serif;
  font-size: 2.8rem;
  font-weight: 500;
  line-height: 1.29;
  margin: 0;
  color: ${props => props.theme.greyishBrown} ${media.tablet`
        font-size: 3.2rem;
        line-height: 1.13;
    `} & + * {
    margin-top: 2.4rem;
  }
`

const SpeakerJobTitle = styled.div`
  font-family: Oxygen, sans-serif;
  font-size: 1.6rem;
  line-height: 1.13;
  color: ${props => props.theme.grape};

  ${media.phone`
        font-size: 1.8rem;
        line-height: 1;    
    `} & + * {
    margin-top: 2.4rem;
  }
`

const Description = styled.p`
  font-family: Oxygen, sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: ${props => props.theme.greyishBrown} ${media.tablet`
        font-size: 1.8rem;
    `};
`

const LinksGrid = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-around;

  ${media.phone`
        justify-content: flex-start;    
    `};
`

const FileLink = styled.a`
  font-family: Oxygen, sans-serif;
  font-size: 1.6rem;
  line-height: 1;
  color: #909090;
  text-decoration: none;

  ${media.phone`
        padding-right: 3.6rem;
    `} ${media.tablet`
        font-size: 1.8rem;
    `};
`

const IconsMixin = `
    height: 1.2rem;
    margin-right: 1.2rem;

    ${media.tablet`
        height: 1.8rem;
    `}
`

const WatchIconStyled = styled(WatchIcon)`
  ${IconsMixin};
`

const DownloadIconStyled = styled(DownloadIcon)`
  ${IconsMixin};
`

const EventTalk = ({ talk }) => (
  <TalkGrid>
    <AvatarWrapper>
      <Avatar avatar={talk.speaker.avatar} stretch />
    </AvatarWrapper>
    <div>
      <Header>{talk.title}</Header>
      <SpeakerJobTitle itemProp="actor">
        {talk.speaker.jobTitle
          ? `${talk.speaker.title}, ${talk.speaker.jobTitle}`
          : talk.speaker.title}
      </SpeakerJobTitle>
      {talk.description ? <Description>{talk.description}</Description> : null}
      {talk.links ? (
        <LinksGrid>
          {talk.links.video ? (
            <FileLink href={talk.links.video} target="__blank">
              <WatchIconStyled />Video
            </FileLink>
          ) : null}
          {talk.links.presentation ? (
            <FileLink href={talk.links.presentation} target="__blank">
              <DownloadIconStyled />Presentation
            </FileLink>
          ) : null}
        </LinksGrid>
      ) : null}
    </div>
  </TalkGrid>
)

EventTalk.propTypes = {
  talk: PropTypes.object,
}

export default EventTalk
