// @flow
import * as React from 'react'
import Video from './common/video'
import { FileLink } from './file-link'
import { WatchIcon } from './icons'

const YoutubeLink = ({ url }: { url: string }) => {
  return (
    <Video src={url}>
      {({ onClick }) => (
        <FileLink icon={WatchIcon} onClick={onClick} href={url}>
          Video
        </FileLink>
      )}
    </Video>
  )
}

export { YoutubeLink }

export default YoutubeLink
