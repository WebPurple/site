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
  plugins: ['@babel/plugin-proposal-class-properties'],
})
