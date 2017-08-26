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
      			presets: ['react', 'es2015']
      		},

		}, {
			 test: /\.css$/,
     		 loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions'
		},
		      		{
		    	test: /\.(png|jpg)$/,
		    	loader: 'url-loader?limit=25000'
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
};