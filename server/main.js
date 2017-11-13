const Koa = require('koa');
const config = require('../config/default');
const fs = require('fs');
var router = require('./router');
const app = new Koa();

require('../config/devserver')()

// https://github.com/glenjamin/ultimate-hot-reloading-example/issues/17
// this is important!
app.use(function(req, res, next) {
  require('./router').routes()(req, res, next);
});

fs.watch(require.resolve('./router'), function() {
  updateRequire('./router')
})

function updateRequire(module){
  console.log(`change file: ${module}`)
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]router[\/\\]/.test(id)) delete require.cache[id];
    require(id)
  });
}

app.listen(config.port);

setTimeout(() => {
  console.log('-------------------------------');
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;