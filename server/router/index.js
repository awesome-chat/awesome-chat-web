const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

// 静态文件
const staticDir = path.join(__dirname, '../../static');

router.get('/', async (ctx) => {
  const filePath = `${staticDir}/index.html`;
  ctx.body = fs.readFileSync(filePath, 'utf-8');
});

router.get('/static/*', async (ctx, next) => {
  const filePath = `${staticDir}${ctx.url.split('/static')[1]}`;
  ctx.body = fs.readFileSync(filePath,'utf-8');
});

module.exports = router;
