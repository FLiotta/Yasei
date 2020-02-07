const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundlerAnalyzer = require('webpack-bundle-analyzer');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/,
				use: [
					{
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			              publicPath: '../',
			            },
			        },
					'css-loader',
          			'sass-loader'
				]
			},
			{
		        test: /\.(png|jpe?g|gif)$/i,
		        use: {
		        	loader: 'file-loader',
		        	options: {
		        		outputPath: 'assets/images/'
		        	}
		        }
			},
			{
		        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
		        use: [
		        	{
		            	loader: 'file-loader',
		            	options: {
		              		name: '[name].[ext]',
		              		outputPath: 'assets/fonts/'
		            	}
		          	}
		        ]
		    },
		    {
		    	test: /\.svg$/,
				use: [
			    	{
			      		loader: "babel-loader"
			    	},
			    	{
			      		loader: "react-svg-loader",
			      		options: {
			        		jsx: true
			      		}
			    	}
			  	]
  			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
	      filename: '[name].css',
	      chunkFilename: '[id].css',
	      ignoreOrder: false,
	    })
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	    historyApiFallback: true,
	    publicPath: '/'
	}
}
