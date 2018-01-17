const express = require('express')
const Sequelize = require('sequelize')
const { User, Dep } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  const {
    userId = null,
    userName = null
  } = req.query;

  const queryConditions = {
    companyId: 1
  }
  if (userName) {
    queryConditions.userName = userName
  }
  if (userId) {
    queryConditions.userId = userId
  }

  User.findAll({
    where: queryConditions,
    attributes: ['userName', 'userId'],
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params
  User.findAll({
    where: {
      userId
    },
    attributes: ['userName', 'userId', 'userTel'],
    include: [{
      model: Dep,
      attributes: ['depId'],
      where: { depId: Sequelize.col('dep.depId') }
    }]
  }).then((d) => {
    res.send(JSON.stringify(d[0]))
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  User.upsert({
    userName: body.userName,
    userTel: body.userTel,
    depId: body.depId || null,
    companyId: 1,
  }).then((d) => {
    res.send(d)
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/', (req, res) => {
  const body = req.body;
  console.log(req.params, body)
  User.update({
    userName: body.userName,
    userTel: body.userTel,
    depId: body.depId || null,
  }, {
    where: { userId: body.userId },
    plain: true
  }).then((d) => {
    res.send(d)
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
