// @flow
import * as React from 'react'
import { shallow } from 'enzyme'
import SpeakerPage from '../speaker-page'

describe('<SpeakerPage>', () => {
  it('should match snapshot', () =>
    expect(
      shallow(
        <SpeakerPage
          speaker={{
            fields: {
              slug: '',
            },
            id: '',
            avatar: null,
            jobTitle: '',
            organization: '',
            socialNetworks: [],
            talks: [],
          }}
        />,
      ),
    ).toMatchSnapshot())
})
