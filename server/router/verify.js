const express = require('express')
const Sequelize = require('sequelize')
const { User, Dep } = require('../models')

const router = express.Router()

router.post('/', (req, res) => {
  const { userMisId, userPwd } = req.body;
  User.findAll({
    where: {
      userMisId,
      userPwd
    }
  }).then((d) => {
    if (d.length > 0) {
      res.send({
        code: 0,
      })
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
