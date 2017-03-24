const path = require('path');
const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [

    new ForceCaseSensitivityPlugin(),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    // TODO: add manifest bundle to optimize long term caching
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        },
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
        title: 'WebPurple',
        template: path.resolve(__dirname, 'src', 'index.html'),
    }),
];

if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}

const config = {

    entry: [
        'react-hot-loader/patch',

        'webpack-hot-middleware/client',

        path.resolve(__dirname, 'src', 'boot.jsx'),
    ],

    output: {
        path: path.resolve(__dirname, '__build__'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },

    module: {

        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },

    resolve: {

        enforceModuleExtension: false,

        extensions: ['.js', '.jsx'],
    },

    plugins,

    devtool: isProd ? 'source-map' : 'eval',
};

module.exports = config;
