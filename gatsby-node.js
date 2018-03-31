const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  let { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    let eventTemplate = path.resolve(`src/templates/event.template.js`)
    resolve(
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
          reject(result.errors)
        }

        result.data.allEventYaml.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: eventTemplate,
            // layout: `blog-layout`,
            context: {
              id: node.id,
            },
          })
        })
      }),
    )
  })
}

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
