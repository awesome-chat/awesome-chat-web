const Koa = require('koa');
const config = require('../config/default');
const fs = require('fs');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/dev.webpack.config');
const serverHotReload = require('../tools/serverHotReload');

const app = new Koa();

const compiler = webpack(webpackConfig);

const hotMiddleware = webpackHotMiddleware(compiler);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/build/',
  stats: {
    colors: true,
    chunks: false,
  },
});

// https://github.com/glenjamin/ultimate-hot-reloading-example/issues/17
app.use((ctx, next) => {
  require('./router').routes()(ctx, next);
});

app.use((ctx, next) => {
  // devMiddleware不能直接通过app.use(xxx)使用
  ctx.res.statusCode = 200;
  devMiddleware(ctx.req, ctx.res, next);
});
// app.use(hotMiddleware);

fs.watch(require.resolve('./router'), () => {
  serverHotReload('./router');
});

app.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;