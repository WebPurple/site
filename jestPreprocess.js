module.exports = require('babel-jest').createTransformer({
  presets: [
    '@babel/preset-flow',
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
})
