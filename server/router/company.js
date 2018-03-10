const express = require('express')
const Sequelize = require('sequelize')
const { Company, User } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  Company.findAll({
    attributes: ['companyName', 'companyMail','companyTel'],
    where: {
      companyId: 1
    },
    include: [{
      model: User,
      attributes: ['userName', 'userId'],
      where: { companyOwnerId: Sequelize.col('user.userId') }
    }]
  }).then((d) => {
    res.send({
      code: 0,
      data: JSON.parse(JSON.stringify(d[0]))
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/', (req, res) => {
  const body = req.body;
  Company.update({
    companyName: body.companyName,
    companyOwnerId: body.companyOwnerId,
    companyTel: body.companyTel,
    companyMail: body.companyMail,
  }, {
    where: { companyId: 1 },
    plain: true
  }).then((d) => {
    res.send({
      code: 0,
      data: d
    })
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
