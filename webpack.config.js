module.exports = {
	entry: [
		'./src/client/client.js'
	],
	module: {
		loaders: [{
	    	//test: /\.jsk?$/,
    		test: /\.(js|jsx)$/,
    		exclude: /node_modules/,
      		loader: 'babel-loader',
      		query: {
      			presets: ['react', 'es2015']
      		}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './dist'
	}
};