const Koa = require('koa');
const config = require('../config/default');
const router = require('./router');
const app = new Koa();


app.use(router.routes())

require('../config/devserver')()

app.listen(config.port)

// delay its appearance to make sure user can notice it..
setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;