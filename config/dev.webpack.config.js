const webpack = require('webpack');
const path = require('path');
const { alias } = require('./default');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ANTD 样式定制
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const ANTDTHEME = {
  '@font-size-base' : '14px'
}


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
        presets: ['es2015', 'react']
      }
    },{
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      include: /node_modules/,
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', `css-loader!less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(ANTDTHEME)}}`),
    },]
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
