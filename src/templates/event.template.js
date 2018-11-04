// @flow
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'
import EventPage from '../components/event-page/event-page'
import type { RawEventType } from '../model'

type EventQueryResultType = {
  data: {
    eventYaml: RawEventType,
  },
}

export default mapProps(({ data: { eventYaml } }: EventQueryResultType) => ({
  event: {
    ...eventYaml,
    talks: eventYaml.fields.talks,
  },
}))(EventPage)

export let pageQuery = graphql`
  query Event($id: String) {
    eventYaml(id: { eq: $id }) {
      fields {
        slug

        talks {
          title
          description
          tags
          links {
            video
            presentation
          }
          speaker {
            fields {
              slug
            }
            avatar
            title
            jobTitle
          }
        }
      }

      title
      description
      date
      address
      socialNetworks {
        type
        link
      }
      vkAlbum {
        photos {
          sizes {
            type
            url
            width
          }
        }
      }
    }
  }
`
