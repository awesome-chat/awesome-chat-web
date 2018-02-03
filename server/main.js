const express = require('express');
const config = require('../config/default');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/dev.webpack.config');
const bodyParser = require('body-parser');

const watch = require('./utils/watch')
const router = require('./router');
let auth = require('./middlewares/auth')
let socket = require('./socket')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').Server(app);

// socket IO
socket(http)

const compiler = webpack(webpackConfig);
// for test

if (process.env.NODE_ENV === 'development') {
  const hotMiddleware = webpackHotMiddleware(compiler);
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/build/',
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);
}

app.use((req, res, next) => auth(req, res, next))

router(app)
if (process.env.NODE_ENV === 'development') {
  watch([
    require.resolve('./middlewares/auth'),
    require.resolve('./socket')
  ], () => {
    auth = require('./middlewares/auth')
    socket = require('./socket')
  })
}

http.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app