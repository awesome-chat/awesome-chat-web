const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {
    authorization_admin = null,
    authorization_user = null,
  } = req.headers

  console.log('path', req.path)

  const skipPaths = [
    /^\/verify/,
    /^\/static/,
    /^\/$/
  ];

  if (skipPaths.some(p => p.test(req.path))) return next();

  if ((!authorization_admin) && (!authorization_user)) {
    res.send({
      code: 2
    })
    return
  }

  // 验证管理员权限
  if (authorization_admin) {
    try {
      const decoded = jwt.verify(authorization_admin, 'secret');
    } catch (err) {
      console.log(err)
      res.send({
        code: 2
      })
    }
  }

  // 验证管理员权限
  if (authorization_user) {
    try {
      const decoded = jwt.verify(authorization_user, 'secret');
      console.log('decoded', decoded)
    } catch (err) {
      console.log(err)
      res.send({
        code: 2
      })
    }
  }
  next();
}