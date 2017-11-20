const express = require('express');
const config = require('../config/default');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const chokidar = require('chokidar');
const webpackConfig = require('../config/dev.webpack.config');
let router = require('./router');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const compiler = webpack(webpackConfig);

const hotMiddleware = webpackHotMiddleware(compiler);
const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/build/',
  stats: {
    colors: true,
    chunks: false,
  },
});

app.use((req, res, next) => {
  router(req, res, next);
});

app.use(devMiddleware);

app.use(hotMiddleware);


io.on('connection', (socket) => {
  console.log('a user connected');
});

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

http.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;