const Koa = require('koa');
const config = require('../config/default');
const fs = require('fs');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const chokidar = require('chokidar');
const webpackConfig = require('../config/dev.webpack.config');
let router = require('./router');

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
// app.use((ctx, next) => {
//   router.routes()(ctx, next);
// });

app.use(router.routes());

app.use((ctx, next) => {
  // devMiddleware不能直接通过app.use(xxx)使用
  ctx.res.statusCode = 200;
  devMiddleware(ctx.req, ctx.res, next);
});
// app.use(hotMiddleware);

chokidar.watch(require.resolve('./router')).on('change', (path) => {
  console.log(path);
  const id = require.resolve('./router/index.js');
  const module = require.cache[id];

  if (module && module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(id), 1);
  }
  delete require.cache[id];
  router = require(id);
})

app.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;