module.exports = (req, res, next) => {
  const {
    authorization_admin = null,
    authorization_user = null,
  } = req.headers

  console.log('path', req.path)

  const skipPaths = [
    /^\/login/,
    /^\//
  ];

  if (skipPaths.some(p => p.test(req.path))) return next();

  if ((!authorization_admin) && (!authorization_user)) {
    res.send({
      code: 2
    })
    return
  }
  // console.log('-------------------------')
  // console.log(req.headers)
  // console.log('Time:', Date.now());
  next();
}