// @flow
import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'

import type { SpeakerType } from '../model'
import Avatar from './common/avatar'
import { tColor } from '../utils/css-utils'
import YoutubeLink from './youtube-link'
import FileLink from './file-link'
import { DownloadIcon } from './icons'
import { SpeakerContacts } from './common/speaker-contacts'

let Name = styled.h1`
  color: ${tColor('lipstick')};
  font-family: Rubic, Helvetica, sans-serif;
  font-size: 32px;
`

let Position = styled.div`
  color: ${tColor('grape')};
  font-size: 18px;
`

let TalkName = styled(Link)`
  color: ${tColor('greyishBrown')};
  font-family: Rubic, Helvetica, sans-serif;
  font-size: 24px;
  text-decoration: none;
`

let ListStyleNone = styled.ul`
  list-style: none;
`

let SpeakerPage = ({ speaker }: { speaker: SpeakerType }) => (
  <Flex
    flexDirection={['column', 'row']}
    m={['2rem 2rem', '4.0rem 8.6rem', '4.0rem 10.8rem', '4.0rem 12rem']}>
    <Flex flexDirection="column" alignItems="center">
      <Box style={{ height: 200 }} mb="16px">
        <Avatar avatar={speaker.avatar} />
      </Box>

      <SpeakerContacts speaker={speaker} />
    </Flex>

    <Box ml={[0, '60px']}>
      <Name>{speaker.title}</Name>

      {(speaker.jobTitle || speaker.organization) && (
        <Position>
          <span>{speaker.jobTitle}</span>
          {speaker.jobTitle && speaker.organization && ', '}
          <span>{speaker.organization}</span>
        </Position>
      )}

      <Flex is={ListStyleNone} flexDirection="column" m={0} p={0} mt="72px">
        {speaker.talks.map(talk => (
          <Flex is="li" key={talk.title} flexDirection="column" mb="15px">
            <Box is={TalkName} to={talk.event.slug} mb="18px">
              {talk.title}
            </Box>

            <Flex mb="36px">
              {talk.links && (talk.links.video || talk.links.presentation) ? (
                <React.Fragment>
                  {talk.links.video && (
                    <Box is={YoutubeLink} url={talk.links.video} mr="36px" />
                  )}
                  {talk.links.presentation && (
                    <FileLink
                      icon={DownloadIcon}
                      href={talk.links.presentation}>
                      Presentation
                    </FileLink>
                  )}
                </React.Fragment>
              ) : (
                <Box fontSize="16px" color={tColor('warmGrey')()}>
                  There is no materials
                </Box>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  </Flex>
)

export { SpeakerPage }

export default SpeakerPage
