var path = require('path');
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    entry: {
        main: "./components/app.tsx"
    },
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: "app.js"
    },
    module: {
        loaders: [
            {test: /\.ts(x?)$/, loader: "ts-loader"}
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
        alias: {
            'react-with-addons': path.join(nodeModulesPath, 'react', 'dist', 'react-with-addons.js'),
            'react-dom': path.join(nodeModulesPath, 'react-dom', 'dist', 'react-dom.js')
        }
    },
    devtool: 'source-map'
};