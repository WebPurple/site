var path = require('path');
var webpack = require('webpack');
require.resolve('babel-loader');

module.exports = {
    context: path.resolve(__dirname),

    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-tap-event-plugin',
            'redux',
            'material-ui',
            'redux-thunk'
        ],
        main: path.join(__dirname, 'src', 'boot.jsx')
    },
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /sinon\.js$/,
                loader: 'imports?define=>false,require=>false'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ],
        noParse: [/sinon/]
    },
    resolve: {
        alias: {'sinon': 'sinon/pkg/sinon'},
        extensions: ['', '.webpack-loader.js', '.web-loader.js', '.loader.js', '.jsx', '.js']
    },

    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],

    devtool: 'source-map'
};