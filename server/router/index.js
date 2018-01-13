const path = require('path')
const chokidar = require('chokidar');

const staticDir = path.join(__dirname, '../../static')
const buildDir = path.join(__dirname, '../../build')
let company = require('./company')

module.exports = (app) => {
  app.get('/', (req, res) => {
    const filePath = `${staticDir}/index.html`;
    res.sendFile(filePath);
  });

  // 打包文件
  app.get('/build/*', (req, res) => {
    const filePath = `${buildDir}${req.url.split('/build')[1]}`;
    res.sendFile(filePath);
  });

  // 静态文件
  app.get('/static/*', (req, res) => {
    const filePath = `${staticDir}${req.url.split('/static')[1]}`;
    res.sendFile(filePath);
  });

  app.use('/company', (req, res, next) => company(req, res, next))

  chokidar.watch(path.join(__dirname, '/')).on('change', (path) => {
    console.log(path);
    const id = require.resolve('./company.js');
    const module = require.cache[id];

    if (module && module.parent) {
      module.parent.children.splice(module.parent.children.indexOf(id), 1);
    }
    delete require.cache[id];
    company = require(id);
  })
}
