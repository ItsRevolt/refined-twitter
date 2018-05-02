'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
	entry: {
		content: './source/content',
		background: './source/background',
		options: './source/options',
		popup: './source/popup'
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([{
			from: '*',
			context: 'source',
			ignore: '*.js'
		}, {
			from: 'style/*',
			context: 'source'
		}, {
			from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
		}, {
			from: 'node_modules/zepto/dist/zepto.min.js'
		}]),
		new WebpackBuildNotifierPlugin({
			title: "My Project Webpack Build",
			logo: path.resolve("./source/icon2.png"),
			suppressSuccess: false
		  })
	],
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
