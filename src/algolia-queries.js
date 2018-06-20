let { omit } = require('ramda')

const ALGOLIA_PREFIX = process.env.ALGOLIA_PREFIX || 'DEV'

module.exports = [
  {
    query: `
    {
      allEventYaml {
        edges {
          node {
            fields {
              slug
            }
            title
            description
            talks {
              title
              description
              speaker
              tags
            }
          }
        }
      }
    }
    `,
    transformer: ({ data }) =>
      data.allEventYaml.edges.reduce(
        (talks, { node: event }) => [
          ...talks,
          ...event.talks.map((talk, i) => ({
            ...talk,
            objectID: `${event.fields.slug}_${i}`,
            slug: event.fields.slug,
            event: omit(['talks', 'fields'], event),
          })),
        ],
        [],
      ),
    indexName: `${ALGOLIA_PREFIX}_talks`,
  },
  {
    query: `
    {
      allSpeakerYaml {
        edges {
          node {
            fields {
              slug
            }
            title
            organization
            jobTitle
          }
        }
      }
    }
    `,
    transformer: ({ data }) =>
      data.allSpeakerYaml.edges.map(({ node: { fields, ...rest } }) => ({
        objectID: fields.slug,
        slug: fields.slug,
        ...rest,
      })),
    indexName: `${ALGOLIA_PREFIX}_speakers`,
  },
  {
    query: `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            
            frontmatter {
              title
              author
            }
            
            headings {
              value
            }
            
            excerpt(pruneLength: 5000)
          }
        }
      }
    }
    `,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(
        ({ node: { fields, frontmatter, headings, excerpt } }) => ({
          objectID: fields.slug,
          slug: fields.slug,
          ...frontmatter,
          headings: headings.map(({ value }) => value),
          content: excerpt,
        }),
      ),
    indexName: `${ALGOLIA_PREFIX}_blog`,
  },
]
