const crypto = require(`crypto`)
const R = require('ramda')
const { VK } = require('vk-io')

const { VK_GROUP_ID, VK_TOKEN } =
  process.env.NODE_ENV === 'production'
    ? process.env
    : {
        VK_GROUP_ID: '-94098151',
        VK_TOKEN:
          'a5e87d46a5e87d46a5e87d4688a58efa77aa5e8a5e87d46fe28c43a9c89a48e02cce22e',
      }

let vk = new VK()

vk.setToken(VK_TOKEN)

let sourceNodes = async ({ actions: { createNode }, createNodeId }) => {
  let { items: albums } = await vk.api.photos.getAlbums({
    owner_id: VK_GROUP_ID,
  })

  let albumsWithPhotos = await Promise.all(
    albums.map(album =>
      vk.api.photos
        .get({ owner_id: VK_GROUP_ID, album_id: album.id })
        .then(({ items }) => ({
          ...album,
          photos: items,
        })),
    ),
  )

  albumsWithPhotos
    .map(album => ({
      ...album,
      id: createNodeId(`${album.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'VkAlbum',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(album))
          .digest(`hex`),
      },
    }))
    .forEach(R.unary(createNode))
}

module.exports = sourceNodes
