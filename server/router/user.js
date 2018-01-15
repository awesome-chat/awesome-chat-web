const express = require('express')
const Sequelize = require('sequelize')
const { Company, User } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['userName', 'userId'],
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
