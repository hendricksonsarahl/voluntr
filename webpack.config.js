const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "static/build"),
    filename: "bundle.js"
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
      }
    ]
  }
};
