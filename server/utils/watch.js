const path = require('path')
const chokidar = require('chokidar');

module.exports = (ids, cb) => {
  chokidar.watch(path.join(__dirname, '../')).on('change', (path) => {
    console.log(`file changed: ${path}`);

    const modules = ids.map(id => require.cache[id])

    modules.forEach((module, index) => {
      if (module && module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(ids[index]), 1);
      }
      delete require.cache[ids[index]];
    });
    cb()
  })
}