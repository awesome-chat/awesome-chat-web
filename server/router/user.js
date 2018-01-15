const express = require('express')
const Sequelize = require('sequelize')
const { User } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  const {
    userId = null,
    userName = null
  } = req.query;

  User.findAll({
    where: {
      companyId: 1,
    },
    attributes: ['userName', 'userId'],
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
