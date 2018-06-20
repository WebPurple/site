let algoliaQueries = require('./src/algolia-queries')

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY

module.exports = {
  siteMetadata: {
    title: 'WebPurple',
    siteUrl: 'https://www.webpurple.net',
  },
  plugins: [
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
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: '16WOJBASFD',
        apiKey: ALGOLIA_ADMIN_KEY,
        queries: algoliaQueries,
        chunkSize: 10000,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-85053004-1',
        head: true,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}
