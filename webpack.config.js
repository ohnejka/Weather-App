const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'none',
  devtool: 'source-map',
  devServer: {
      contentBase: './public'
       },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([
      {from: './index.html'},
      {from: './style.css'}
    ])
  ]
};