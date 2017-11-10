const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  javascript: './src/js/main.js',
  css: './src/css/style.css',
  dist: path.join(__dirname, './static/build')
};
 
module.exports = {
  devtool: 'source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('development')
    //   }
    // }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin("bundle.css")
  ],
  entry: {
    javascript: PATHS.javascript,
    css: PATHS.css
  },
  output: {
    path: PATHS.dist,
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["eslint-loader"],
        exclude: /node_modules/,
        // options: {
        //   emitWarning: true
        // }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      { 
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      { 
        test: /\.png$/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      }
    ]
  }
};