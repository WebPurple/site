import * as React from 'react'
import SpeakerCard from '../../components/speaker-card/speaker-card'

export default ({ entry }) => (
  <div>
    {JSON.stringify(entry.toJS().data)}
    <SpeakerCard speaker={entry.toJS().data} />
  </div>
)
