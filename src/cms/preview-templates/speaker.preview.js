import * as React from 'react'
import Avatar from '../../components/common/avatar'

export default ({ entry }) => (
  <div>
    {JSON.stringify(entry.toJS())}
    <Avatar avatar={entry.getIn(['data', 'avatar'])} />
  </div>
)
