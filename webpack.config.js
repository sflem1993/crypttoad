const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: [
		'./src/client/index.jsx'
	],
	module: {
		loaders: [{
	    	//test: /\.jsk?$/,
    		test: /\.(js|jsx)$/,
    		exclude: /node_modules/,
      		loader: 'babel-loader',
      		query: {
      			presets: ['react', 'es2015', 'stage-2']
      		},

		}, {
			 test: /\.css$/,
     		 loader: 'style-loader!css-loader!postcss-loader'
		}, {
	    	test: /\.(png|jpg|gif)$/,
	    	loader: 'img-loader!url-loader?limit=25000'
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
	},
	plugins: [
    	new UglifyJSPlugin({
    		include: /\.(js|jsx|css)$/,
    	}),
  	]
};