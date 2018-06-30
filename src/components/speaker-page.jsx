// @flow
import * as React from 'react'
import type { ISpeaker } from '../model'

const SpeakerPage = ({ speaker }: { speaker: ISpeaker }) => (
  <div>
    <h1>{speaker.title}</h1>
  </div>
)

export { SpeakerPage }

export default SpeakerPage
