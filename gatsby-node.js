const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    let eventTemplate = path.resolve(`src/templates/event.js`)
    resolve(
      graphql(
        `
          {
            allEventYaml(sort: { fields: [date], order: DESC }) {
              edges {
                node {
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
          const title = node.title

          console.log(title)

          createPage({
            path: `/events/${title}`,
            component: eventTemplate,
            // layout: `blog-layout`,
            context: {
              title,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {}
