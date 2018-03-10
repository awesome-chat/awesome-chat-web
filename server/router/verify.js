const express = require('express')
const Sequelize = require('sequelize')
const { User, Admin } = require('../models')
const eventproxy = require('eventproxy')
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/user', (req, res) => {
  const ep = new eventproxy();
  const { userMisId, userPwd } = req.body;

  // 用户授权
  ep.on('authUser', (user) => {
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) },
      'secret'
    );
    res.setHeader('authorization_user', token)
    console.log('---------------------')
    console.log('user:', user)
    res.send({
      code: 0,
      data: user
    })
  });

  User.findAll({
    attributes: [
      'userAvatar',
      'userName',
      'userMisId',
      'userMisId',
      'userSex',
      'userId',
      'userTel',
      'userSign',
      'userWorkPlace',
      'userExt',
      'userRegisterTime',
      'lastUpdateTime'
    ],
    where: {
      userMisId,
      userPwd
    }
  }).then((d) => {
    User.update({
      lastUpdateTime: Date.parse(new Date())
    }, {
      where: { userMisId },
      plain: true
    })
    if (d.length > 0) {
      ep.emit('authUser', JSON.parse(JSON.stringify(d[0])));
    } else {
      res.send({
        code: 1,
      })
    }
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/admin', (req, res) => {
  const ep = new eventproxy();

  // 管理员授权
  ep.on('authAdmin', (user) => {
    console.log(user)
    jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) },
      'secret',
      (err, token) => {
        if (err) {
          res.send({
            code: 1,
          })
          return
        }
        console.log('token', token)
        res.setHeader('authorization_admin', token)
        res.send({
          code: 0,
        })
      }
    )
  });

  const { adminName, adminPwd } = req.body;
  Admin.findAll({
    where: {
      adminName,
      adminPwd
    }
  }).then((d) => {
    if (d.length > 0) {
      ep.emit('authAdmin', JSON.parse(JSON.stringify(d[0])));
    } else {
      res.send({
        code: 1,
      })
    }
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router
