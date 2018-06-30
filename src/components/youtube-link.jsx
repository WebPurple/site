// @flow
import * as React from 'react'
import Video from './common/video'
import { FileLink } from './file-link'
import { WatchIcon } from './icons'

const YoutubeLink = ({
  url,
  className,
}: {
  url: string,
  className?: string,
}) => {
  return (
    <Video src={url}>
      {({ onClick }) => (
        <FileLink
          icon={WatchIcon}
          onClick={onClick}
          href={url}
          className={className}>
          Video
        </FileLink>
      )}
    </Video>
  )
}

export { YoutubeLink }

export default YoutubeLink
