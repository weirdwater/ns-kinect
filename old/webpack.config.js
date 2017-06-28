const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash:8].js',
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	devtool: 'source-maps'
}