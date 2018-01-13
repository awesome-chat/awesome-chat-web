const express = require('express')
const Sequelize = require('sequelize')
const { Company, User } = require('../models')

const router = express.Router()

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('id', id)

  Company.findAll({
    attributes: ['companyName', 'companyMail','companyTel'],
    where: {
      companyId: id
    },
    include: [{
      model: User,
      attributes: ['userName'],
      where: { companyOwnerId: Sequelize.col('user.userId') }
    }]
  }).then((d) => {
    res.send(JSON.stringify(d[0]))
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
