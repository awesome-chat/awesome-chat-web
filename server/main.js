const Koa = require('koa');
const config = require('../config/default');
const fs = require('fs');
const app = new Koa();

require('../config/devserver')()

// https://github.com/glenjamin/ultimate-hot-reloading-example/issues/17
app.use(function(ctx, next) {
  require('./router').routes()(ctx, next);
});

fs.watch(require.resolve('./router'), function() {
  serverHotReload('./router')
})

// router热更新
function serverHotReload(module){
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