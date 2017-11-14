// router热更新
module.exports = function serverHotReload(module) {
  console.log(`change file: ${module}`);
  Object.keys(require.cache).forEach((id) => {
    if (/[\/\\]router[\/\\]/.test(id)) delete require.cache[id];
    require(id)
  });
}