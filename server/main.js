const Koa = require('koa');
const config = require('../config/default');
const fs = require('fs');
let router = require('./router');
const app = new Koa();

app.use(router.routes());

require('../config/devserver')()


fs.watch(require.resolve('./router'), function() {
  router = requireUncached('./router')
})

function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

app.listen(config.port);

// delay its appearance to make sure user can notice it..
setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;