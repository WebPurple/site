import * as React from 'react'
import SpeakerCard from '../../components/speaker-card/speaker-card'

export default ({ entry }) => (
  <div>
    {JSON.stringify(entry.toJS().data)}
    {JSON.stringify(entry.toJS())}
    {/*<SpeakerCard speaker={entry.toJS().data} />*/}
  </div>
)
