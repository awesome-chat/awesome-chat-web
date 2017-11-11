const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware =  require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

module.exports = () => {
  const hotMiddleware = webpackHotMiddleware(compiler);
  const devMiddleware = webpackDevMiddleware(compiler);
  
  return app => {
    app.use(hotMiddleware)
    app.use(devMiddleware)

    app.use(async function (next) {
      await new Promise((resolve, reject) => {
        hotMiddleware(this.req, this.res, err => {
          if (err) {
            reject(err);
          }
          resolve(next);
        });
      });
    });
  }
}