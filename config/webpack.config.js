const webpack = require('webpack');
const path = require('path');

const __ROOT = path.resolve(__dirname, '../');
const __NODE_MODULES = path.join(__ROOT, 'node_modules');
const __BUILD = path.join(__ROOT, 'build');
const __CLIENT = path.join(__ROOT, 'client');
const __SERVER = path.join(__ROOT, 'server');
const __CONFIG = path.join(__ROOT, 'config');

const baseConfig = {
  context: __ROOT,
  entry: {
    'commonLib': [`${__CLIENT}/index.jsx`,'webpack-hot-middleware/client'],
  },
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
    filename: '[name].js',
    path: __BUILD,
    publicPath: __ROOT,
    library: '[name]'
  },
  devtool: 'inline-source-map',  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = baseConfig;