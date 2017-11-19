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
        presets: ['es2015', 'stage-0', 'react']
      }
    },{
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
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
