const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

module.exports = () => {
  const hotMiddleware = webpackHotMiddleware(compiler);
  const devMiddleware = webpackDevMiddleware(compiler,{
    publicPath: '/static/',
    stats: {
      colors: true,
      chunks: false,
    },
  });

  return (app) => {
    app.use(hotMiddleware);
    app.use(devMiddleware);
  };
};
