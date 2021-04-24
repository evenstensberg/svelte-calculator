const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.bundle.js',
        path: path.join(__dirname, 'public'),
        chunkFilename: '[name].[id].chunk.js'
    },
    resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
    module: {
        rules: [
            {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: true
						},
						emitCss: false,
						hotReload: true
					}
				}
			},
            {
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
        ]
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: 8090,
        host: 'localhost'
    },
    plugins: [
        new HtmlWebpackPlugin({
			title: 'svelte-calculator'
		}),
    ]

}