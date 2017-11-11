const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/js/main.js",
    vendor: "./src/js/vendor.js",
    css: "./src/css/main.css"
  },
  output: {
    path: path.resolve(__dirname, "static/build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: false
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.(png|jpg|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader"]
        })
      }
    ]
  },
  plugins: [
    // Prevent vendor code from being duplicated in other bundles:
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    }),
    new ExtractTextPlugin("bundle.css")


    // Minify JS Code (reduces file size by ~60-70%, but makes it unreadable)
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
