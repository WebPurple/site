// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'

import Avatar from './../../common/avatar'
import { tColor } from './../../../utils/css-utils'
import { DownloadIcon } from './../../icons'
import YoutubeLink from '../../youtube-link'
import { FileLink } from '../../file-link'
import type { TalkType } from '../../../model'

// TODO: shity Avatar
const AvatarWrapper = styled.div`
  height: 200px;
`

const Header = styled.h3`
  font-family: Rubik, sans-serif;
  font-weight: 500;
`

const EventTalk = ({ talk }: { talk: TalkType }) => (
  <Flex flexDirection={['column', 'row']} alignItems={['center', 'flex-start']}>
    <Box is={AvatarWrapper} mr={['27px', '36px', '24px']}>
      <Avatar avatar={talk.speaker.avatar} stretch />
    </Box>

    <div>
      <Box
        is={Header}
        color={tColor('greyishBrown')()}
        fontSize={['28px', '32px']}
        m={0}
        mb="24px">
        {talk.title}
      </Box>

      <Box
        itemProp="actor"
        color={tColor('grape')()}
        fontSize={['16px', '18px']}
        mb="24px">
        {talk.speaker.jobTitle
          ? `${talk.speaker.title}, ${talk.speaker.jobTitle}`
          : talk.speaker.title}
      </Box>

      {talk.description && (
        <Box
          color={tColor('greyishBrown')()}
          fontSize={['16px', '18px']}
          mb="24px">
          {talk.description}
        </Box>
      )}

      {talk.links && (
        <Flex justifyContent={['space-around', 'flex-start']}>
          {talk.links.video && (
            <Box is={YoutubeLink} url={talk.links.video} mr={[0, '36px']} />
          )}
          {talk.links.presentation && (
            <FileLink icon={DownloadIcon} href={talk.links.presentation}>
              Presentation
            </FileLink>
          )}
        </Flex>
      )}
    </div>
  </Flex>
)

export default EventTalk
