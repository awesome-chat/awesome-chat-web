const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (ctx, next) => {
  const filePath = path.resolve('./server/template/index.html')
  ctx.body = fs.readFileSync(filePath,'utf-8');
});

module.exports = router;