const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/js/main.js",
  entry: {
    bundle: "./src/js/main.js",
    vendor: ["jquery", "bootstrap", "intro.js"]
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
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  // ]
};
