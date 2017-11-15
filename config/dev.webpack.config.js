const webpack = require('webpack');
const path = require('path');
const { alias } = require('./default');

const baseConfig = {
  context: alias['@root'],
  entry: path.resolve(__dirname, '../client/index/index.jsx'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [alias['@client']],
      },
    ],
  },
  output: {
    path: alias['@build'],
    publicPath: '/build/',
    filename: 'index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = baseConfig;
