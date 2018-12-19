require('dotenv').config()

let algoliaQueries = require('./src/algolia-queries')

let plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sitemap',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: 'WebPurple',
      short_name: 'WebPurple',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#9012fe',
      display: 'minimal-ui',
      icon: 'static/android-chrome-512x512.png',
    },
  },
  'gatsby-plugin-flow',
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/pages`,
      name: 'pages',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/img`,
      name: 'images',
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: ['gatsby-remark-prismjs'],
    },
  },
  `gatsby-transformer-yaml`,
  'gatsby-plugin-netlify-cms',
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-85053004-1',
      head: true,
      anonymize: true,
      respectDNT: true,
    },
  },
]

if (process.env.ALGOLIA_ADMIN_KEY) {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: '16WOJBASFD',
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries: algoliaQueries,
      chunkSize: 10000,
    },
  })
}

plugins = [
  ...plugins,
  'gatsby-plugin-offline',
  'gatsby-plugin-webpack-size',
  {
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: {
        '/*': ['X-Frame-Options: allow-from https://kitos.github.io/'],
      },
      mergeSecurityHeaders: false,
    },
  },
]

module.exports = {
  siteMetadata: {
    title: 'WebPurple',
    siteUrl: 'https://www.webpurple.net',
  },
  plugins,
  mapping: {
    'MarkdownRemark.frontmatter.author': 'SpeakerYaml',
    'EventYaml.vkAlbum': 'VkAlbum',
    // TODO: remove this mapping
    'EventYaml.fields.talks': 'EventTalk',
    'EventYaml.talks.speaker': 'SpeakerYaml',
    'EventTalk.speaker': 'SpeakerYaml',
    'EventTalk.event': 'EventYaml',
    'SpeakerYaml.fields.talks': 'EventTalk',
    // 'EventYaml.talks.speaker': 'SpeakerYaml',
  },
}
