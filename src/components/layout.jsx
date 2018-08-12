// @flow
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { YMInitializer } from 'react-yandex-metrika'

import faviconICO from '../../static/favicon.ico'
import appleFavicon from '../../static/apple-touch-icon.png'
import favicon16 from '../../static/favicon-16x16.png'
import favicon32 from '../../static/favicon-32x32.png'
import safariPinnedTab from '../../static/safari-pinned-tab.svg'

import { colors, sizes } from '../utils/css-utils'
import Header from './header'
import Footer from './footer'

import { ErrorHandler } from '../components/error-handler'

let theme = {
  ...colors, // deprecated
  colors,

  breakpoints: Object.values(sizes)
    .slice(1)
    .map(s => `${+s / 16}em`),
}

injectGlobal`
  html {
    font-size: .625em; /* 10px; */
  }
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  }
`

let Layout = ({ children }: { children: React.Node }) => (
  <ErrorHandler>
    <ThemeProvider theme={theme}>
      <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
        <Helmet>
          <title>WebPurple</title>
          <link rel="apple-touch-icon" sizes="180x180" href={appleFavicon} />
          <link rel="icon" type="image/png" href={favicon32} sizes="32x32" />
          <link rel="icon" type="image/png" href={favicon16} sizes="16x16" />
          <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
          <link rel="shortcut icon" href={faviconICO} />
          <script type="application/ld+json">
            {`
          {
            "@context": "http://www.schema.org",
            "@type": "Organization",
            "name": "WebPurple",
            "url": "http://www.webpurple.net/",
            "description": "Ryazan front-end community"
          }
        `}
          </script>
          <noscript>
            Для работы этой страницы вам нужно включить JavaScript. You need to
            enable JavaScript to run this app.
          </noscript>
        </Helmet>
        {process.env.NODE_ENV === 'production' && (
          <YMInitializer
            accounts={['39965000']}
            options={{
              id: 39965000,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              trackHash: true,
            }}
          />
        )}
        <Header />
        <Box is="main" flex="1 0 auto">
          {children}
        </Box>
        <Footer />
      </Flex>
    </ThemeProvider>
  </ErrorHandler>
)

export default Layout
