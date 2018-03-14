const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

if (process.env.NODE_ENV === 'travisci') {
    // if we set NODE_ENV === 'production' on Travis, it will not install devDependencies
    // but to remove debug code from libraries and add metrics we need NODE_ENV === 'production'
    // so now I don't know better solution than this hack
    process.env.NODE_ENV = 'production';
}

const isProd = process.env.NODE_ENV === 'production';

const babelLoader = {
    loader: 'babel-loader',
};

const plugins = [

    new HappyPack({
        id: 'JavaScript',
        threads: Math.min(os.cpus().length, 4),
        loaders: [babelLoader],
    }),

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

		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		})
];

if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    babelLoader.query = {
        plugins: ['styled-components'],
    };
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
                use: ['happypack/loader?id=JavaScript'],
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {

        enforceModuleExtension: false,

        extensions: ['.js', '.jsx'],
    },

    plugins,

    devtool: isProd ? 'source-map' : 'eval-source-map',
};

module.exports = config;
