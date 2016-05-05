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
            {test: /sinon\.js$/, loader: "imports?define=>false,require=>false"},
            
            {test: /\.ts(x?)$/, loader: 'ts-loader'}
        ],
        noParse: [/sinon/]
    },
    resolve: {
        alias: {'sinon': 'sinon/pkg/sinon'},
        extensions: ['', '.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],

    devtool: 'source-map'
};