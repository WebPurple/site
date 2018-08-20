const { pick } = require('ramda')
const { transliterate } = require('transliteration')
const { createFilePath } = require('gatsby-source-filesystem')

let onCreateNode = ({
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
      value: transliterate(createFilePath({ node, getNode })),
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

      let userTalks = getNodes()
        .filter(n => n.internal.type === 'EventYaml')
        .filter(event => event.talks.some(t => t.speaker === node.title))
        .reduce(
          (talks, event) => [
            ...talks,
            ...event.talks.filter(t => t.speaker === node.title).map(talk => ({
              ...pick(['title', 'tags', 'links'], talk),
              event: {
                ...pick(['title', 'date'], event),
                slug: createFilePath({ node: event, getNode }),
              },
            })),
          ],
          [],
        )

      createNodeField({
        node,
        name: 'talks',
        value: userTalks,
      })

      createNodeField({
        node,
        name: 'talksCount',
        value: userTalks.length,
      })
  }
}
module.exports = onCreateNode
