const express = require('express')
const Sequelize = require('sequelize')
const { Dep } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  Dep.findAll({
    where: { companyId: req.params.id },
    attributes: ['depName', 'depId'],
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/', (req, res) => {
  const body = req.body;
  console.log(req.params, body)
  Dep.upsert({
    depName: body.depName,
    depOwnerId: body.depOwnerId,
    depParentId: body.depParentId,
    companyId: 1,
  }).then((d) => {
    res.send(d)
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
