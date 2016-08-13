var path = require('path');
var webpack = require('webpack');

module.exports = {

    context: path.join(__dirname, '.'),

    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-tap-event-plugin',
            'redux',
            'material-ui',
            'redux-thunk'
        ],

        main: path.join(__dirname, 'src', 'boot.jsx'),
    },

    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: '[name].js'
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
            }
        ],
        noParse: [/sinon/]
    },

    resolve: {
        alias: { 'sinon': 'sinon/pkg/sinon' },
        extensions: ['', '.jsx', '.js']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity,
        })
    ],

    devtool: 'source-map'
};