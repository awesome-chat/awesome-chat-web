const webpack = require('webpack');
const path = require('path');
const { alias } = require('./default');

const baseConfig = {
  context: alias['@root'],
  entry: {
    main:[path.resolve(__dirname, '../client/index/index.jsx'),'webpack-hot-middleware/client?reload=true'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [alias['@client']],
      loader: 'babel-loader',
      query: {
        presets: [
          ['env', {
            'targets': {
              'node': 'current'
            }
          }],
          'stage-0',
          'react'
        ],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }],
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader',
      }]
    }, {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        }
      ]
    }]
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
