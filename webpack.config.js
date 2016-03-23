var path = require('path');

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
        extensions: ['', '.ts', '.tsx', '.js']
    },
    devtool: 'source-map'
};