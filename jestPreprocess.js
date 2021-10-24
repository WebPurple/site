module.exports = require('babel-jest').default.createTransformer({
  presets: [
    '@babel/preset-flow',
    [
      '@babel/env',
      {
        targets: {
          node: '14',
        },
      },
    ],
    '@babel/react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
})
