var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-tap-event-plugin',
            'redux',
            'material-ui',
            'redux-thunk'
        ],
        main: './components/boot.tsx'
    },
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {test: /\.ts(x?)$/, loader: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],

    devtool: 'source-map'
};