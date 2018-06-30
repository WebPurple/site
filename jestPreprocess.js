module.exports = require('babel-jest').createTransformer({
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: '8',
            },
          },
        ],
        '@babel/react',
      ],
    },
  },
})
