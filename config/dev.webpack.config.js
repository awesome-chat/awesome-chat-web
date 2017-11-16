const webpack = require('webpack');
const path = require('path');
const { alias } = require('./default');

const baseConfig = {
  context: alias['@root'],
  entry: {
    main:[path.resolve(__dirname, '../client/index/index.jsx'),'webpack-hot-middleware/client'],
  },
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
