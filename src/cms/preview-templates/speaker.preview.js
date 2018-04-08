import * as React from 'react'
import SpeakerCard from '../../components/speaker-card/speaker-card'

export default ({ entry }) => <SpeakerCard speaker={entry.toJS().data} />
