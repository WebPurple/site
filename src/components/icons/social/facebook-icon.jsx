import * as React from 'react'
import styled from 'styled-components'
import { SVG, prepareFillColors } from './icon-wrapper'

const colorMap = {
  '#facebook-icon': '#3b5998',
}

const FacebookSVG = styled(SVG)`
  ${prepareFillColors(colorMap)};
`

const FacebookIcon = props => (
  <FacebookSVG width="65" {...props} viewBox="0 0 25 45">
    <path
      id="facebook-icon"
      d="M23.353.009L17.532 0C10.993 0 6.767 4.347 6.767 11.075v5.107H.914a.915.915 0 0 0-.914.916v7.4c0 .505.41.916.914.916h5.853v18.67c0 .505.41.916.916.916h7.633a.917.917 0 0 0 .916-.916v-18.67h6.842a.916.916 0 0 0 .915-.916l.004-7.4a.912.912 0 0 0-.916-.916h-6.845v-4.33c0-2.08.495-3.136 3.197-3.136l3.921-.003a.915.915 0 0 0 .914-.916V.928a.917.917 0 0 0-.911-.92z"
      fill="#000"
      fillRule="evenodd"
    />
  </FacebookSVG>
)

export default FacebookIcon
