// @flow
import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'

import Avatar from './../../common/avatar'
import { tColor } from './../../../utils/css-utils'
import { DownloadIcon } from './../../icons'
import YoutubeLink from '../../youtube-link'
import { FileLink } from '../../file-link'
import type { TalkType } from '../../../model'

// TODO: shity Avatar
let AvatarWrapper = styled(Link)`
  display: block;
  height: 200px;
`

let Header = styled.h3`
  font-weight: 500;
`

let SpeakerLink = styled(Link)`
  display: block;
  text-decoration: none;
`

let EventTalk = ({ talk }: { talk: TalkType }) => {
  // TODO: remove this workaround
  let speaker = talk.speaker || {}
  let speakerUrl =
    speaker.fields && speaker.fields.slug.replace('speaker', 'speakers')

  return (
    <Flex
      flexDirection={['column', 'row']}
      alignItems={['center', 'flex-start']}>
      <Box is={AvatarWrapper} to={speakerUrl} mr={['27px', '36px', '24px']}>
        <Avatar avatar={speaker.avatar} stretch />
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
          is={SpeakerLink}
          to={speakerUrl}
          itemProp="actor"
          color={tColor('grape')()}
          fontSize={['16px', '18px']}
          mb="24px">
          {speaker.jobTitle
            ? `${speaker.title}, ${speaker.jobTitle}`
            : speaker.title}
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
}

export default EventTalk
