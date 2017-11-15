// router热更新
module.exports = function serverHotReload(module) {
  if (require.cache[module].parent) {
    module.parent.children.splice(require.cache[module].parent.children.indexOf(module), 1);
  }
  delete require.cache[module];
  require(module)
}