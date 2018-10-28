/* eslint-disable */
module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'eslint-loader',
      options: {
        formatter: require("eslint-friendly-formatter")
      }
    }]
  }
}