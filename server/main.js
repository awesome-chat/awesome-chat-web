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

const app = express();
app.use(bodyParser.json())

const http = require('http').Server(app);
const io = require('socket.io')(http);

const compiler = webpack(webpackConfig);

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

watch([
  require.resolve('./middlewares/auth')
], () => {
  auth = require('./middlewares/auth')
})

io.on('connection', (socket) => {
  console.log('connection', socket.id)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`message: ${msg}`);
  });
});

http.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app