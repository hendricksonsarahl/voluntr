const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/js/main.js",
  entry: {
    bundle: "./src/js/main.js",
    vendor: "./src/js/vendor.js"
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
    // Prevent vendor code from being duplicated in other bundles:
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    })
  ]
};
