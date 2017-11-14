const webpack = require('webpack');
const path = require('path');

const __ROOT = path.resolve(__dirname, '../');
const __NODE_MODULES = path.join(__ROOT, 'node_modules');
const __STATIC = path.join(__ROOT, 'static');
const __CLIENT = path.join(__ROOT, 'client');
const __SERVER = path.join(__ROOT, 'server');
const __CONFIG = path.join(__ROOT, 'config');

const baseConfig = {
  context: __ROOT,
  entry: path.resolve(__dirname, '../client/index.jsx'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [__CLIENT],
      }
    ],
  },
  output: {
    path: __STATIC,
    filename: 'index.js',
  },
  devtool: 'inline-source-map',  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = baseConfig;