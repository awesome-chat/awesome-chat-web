const express = require('express')
const Sequelize = require('sequelize')
const { Dep } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  const {
    depId = null,
    depName = null
  } = req.query;

  const queryConditions = {
    companyId: 1
  }
  if (depName) {
    queryConditions.depName = depName
  }
  if (depId) {
    queryConditions.depId = depId
  }
  Dep.findAll({
    where: queryConditions,
    attributes: ['depName', 'depId'],
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:depId', (req, res) => {
  const { depId } = req.params
  Dep.findAll({
    where: {
      depId
    },
  }).then((d) => {
    res.send(JSON.stringify(d[0]))
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log(req.params, body)
  Dep.upsert({
    depName: body.depName,
    depOwnerId: body.depOwnerId || null,
    depParentId: body.depParentId || null,
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
  Dep.update({
    depName: body.depName,
    depOwnerId: body.depOwnerId || null,
    depParentId: body.depParentId || null,
  }, {
    where: { depId: body.depId },
    plain: true
  }).then((d) => {
    res.send(d)
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
