let algoliaQueries = require('./src/algolia-queries')

let plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/pages`,
      name: 'pages',
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [],
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

module.exports = {
  siteMetadata: {
    title: 'WebPurple',
    siteUrl: 'https://www.webpurple.net',
  },
  plugins,
}
