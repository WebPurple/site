const crypto = require(`crypto`)
const R = require('ramda')
const { VK } = require('vk-io')

const { VK_GROUP_ID, VK_TOKEN } = process.env

let vk = new VK({ token: VK_TOKEN })

let sourceNodes = async ({ actions: { createNode } }) => {
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
      id: album.title,
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
