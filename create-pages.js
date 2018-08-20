const path = require('path')

let createEventPages = ({ actions: { createPage }, graphql }) =>
  graphql(
    `
      {
        allEventYaml(sort: { fields: [date], order: DESC }) {
          edges {
            node {
              id
              fields {
                slug
              }
              title
              description
              date
              address
              talks {
                title
                speaker
              }
            }
          }
        }
      }
    `,
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allEventYaml.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/event.template.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

let createBlogPostPages = ({ actions: { createPage }, graphql }) =>
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) =>
      createPage({
        path: node.fields.slug,
        component: path.resolve('src/templates/blog-post.template.js'),
        context: {
          id: node.id,
        },
      }),
    )
  })

let createSpeakerPages = ({ actions: { createPage }, graphql }) =>
  graphql(`
    {
      allSpeakerYaml {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allSpeakerYaml.edges.forEach(({ node: { id, fields } }) =>
      createPage({
        path: fields.slug.replace('speaker', 'speakers'),
        component: path.resolve('src/templates/speaker.template.jsx'),
        context: { id },
      }),
    )
  })

let createPages = (...args) =>
  Promise.all([
    createEventPages(...args),
    createBlogPostPages(...args),
    createSpeakerPages(...args),
  ])

module.exports = createPages
