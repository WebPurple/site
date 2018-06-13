const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

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

exports.createPages = (...args) =>
  Promise.all([createEventPages(...args), createBlogPostPages(...args)])

exports.onCreateNode = ({
  node,
  actions: { createNodeField },
  getNodes,
  getNode,
}) => {
  let getUser = title =>
    getNodes().find(n => n.internal.type === 'SpeakerYaml' && n.title === title)
  let addSlugField = () =>
    createNodeField({
      name: `slug`,
      node,
      value: createFilePath({ node, getNode }),
    })

  switch (node.internal.type) {
    case 'MarkdownRemark': // blog post
      addSlugField()

      createNodeField({
        node,
        name: 'author',
        value: getUser(node.frontmatter.author),
      })
      break
    case 'EventYaml':
      addSlugField()

      createNodeField({
        node,
        name: 'talks',
        value: node.talks.map(talk => ({
          ...talk,
          speaker: getUser(talk.speaker),
        })),
      })
      break
    case 'SpeakerYaml':
      addSlugField()
  }
}
