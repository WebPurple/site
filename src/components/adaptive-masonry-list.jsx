import * as React from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'
import { Media } from '../utils/css-utils'

let AdaptiveMasonryList = styled(({ children, className }) => (
  <Media.MobileOnly>
    {isMobile =>
      isMobile ? (
        <ul className={className}>{children}</ul>
      ) : (
        <Media.DesktopPlus>
          {isDesktop => (
            <Masonry
              className={className}
              elementType="ul"
              options={{ gutter: isDesktop ? 75 : 30, fitWidth: true }}>
              {children}
            </Masonry>
          )}
        </Media.DesktopPlus>
      )
    }
  </Media.MobileOnly>
))`
  list-style: none;
  padding: 0;
`

export default AdaptiveMasonryList
