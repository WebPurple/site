const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

let createEventPages = ({ boundActionCreators: { createPage }, graphql }) =>
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

exports.createPages = (...args) => Promise.all([createEventPages(...args)])

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  let { createNodeField } = boundActionCreators

  if (/MarkdownRemark|EventYaml|SpeakerYaml/.test(node.internal.type)) {
    let value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
