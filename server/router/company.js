const express = require('express')
const { Company } = require('../models')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(' in test')
  Company.findAll({
    attributes: ['companyId', 'companyName']
  }).then((d) => {
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
