const crypto = require('crypto')
const { transliterate } = require('transliteration')
const { createFilePath } = require('gatsby-source-filesystem')

let onCreateNode = ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getNodes,
  getNode,
}) => {
  let addSlugField = () =>
    createNodeField({
      name: `slug`,
      node,
      value: transliterate(createFilePath({ node, getNode })),
    })

  let createTalkId = talk => createNodeId(talk.title)

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
          event: node.id,
          id: createTalkId(talk),
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
        value: node.talks.map(createTalkId),
      })
      break
    case 'SpeakerYaml':
      addSlugField()

      let images = getNodes().filter(
        n => n.internal.type === 'File' && /jpg/.test(n.internal.extension),
      )
      let userAvatar = images.find(
        i => node.avatar && i.publicURL === node.avatar,
      )

      if (userAvatar) {
        createNodeField({
          node,
          name: 'avatar___NODE',
          value: userAvatar.id,
        })
      }

      let userTalks = getNodes()
        .filter(n => n.internal.type === 'EventYaml')
        .filter(event => event.talks.some(t => t.speaker === node.id))
        .reduce(
          (talks, event) => [
            ...talks,
            ...event.talks
              .filter(t => t.speaker === node.id)
              .map(createTalkId),
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
