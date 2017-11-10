const Koa = require('koa');
const config = require('../config/server');
const app = new Koa();

// response
app.use(async (ctx, next) => {
  ctx.body = "Hello world";
});
app.listen(config.port);

// delay its appearance to make sure user can notice it..
setTimeout(() => {
  console.log('-------------------------------');
  console.log(app)
  console.log(`app server is listening on ${config.port}`);
  console.log('-------------------------------');
}, 1000);

module.exports = app;