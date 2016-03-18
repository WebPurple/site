var path = require('path');
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    entry: {
        main: "./components/app.tsx"
    },
    output: {
        path: "./build",
        filename: "app.js"
    },
    module: {
		loaders: [
			{ test: /\.ts(x?)$/, loader: "ts-loader" }
		]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
        alias: {
            'react': path.join(nodeModulesPath, 'react', 'dist', 'react.js'),
            'react-dom': path.join(nodeModulesPath, 'react-dom', 'dist', 'react-dom.js'),
            'post': path.join(__dirname, 'components', 'post.tsx')
		}
    }
};