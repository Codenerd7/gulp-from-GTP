const path = require('path');

module.exports = {
	entry: './src/base/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	devtool: 'source-map'
};
