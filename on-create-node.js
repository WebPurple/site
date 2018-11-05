const crypto = require('crypto')
const { pick } = require('ramda')
const { transliterate } = require('transliteration')
const { createFilePath } = require('gatsby-source-filesystem')

let onCreateNode = ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
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
      break
    case 'EventYaml':
      addSlugField()

      node.talks.forEach(talk =>
        createNode({
          ...talk,
          date: node.date,
          id: createNodeId(talk.title),
          parent: node.id,
          children: [],
          internal: {
            type: 'EventTalk',
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(talk))
              .digest(`hex`),
          },
        }),
      )

      // TODO: remove this mapping
      createNodeField({
        node,
        name: 'talks',
        value: node.talks.map(talk => createNodeId(talk.title)),
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
