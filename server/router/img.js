const express = require('express')
const Sequelize = require('sequelize')
const { Company, User } = require('../models')
const path = require('path')
const router = express.Router()
const formidable = require('formidable');

router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, '../../static/img')
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('files.images:', files.images)
    const pathArr = files.images.path.split('/')
    const fileName = pathArr[pathArr.length - 1]
    res.send({
      code: 0,
      fileName
    });
  });
});

router.post('/avatar', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, '../../static/img')
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    const pathArr = files.images.path.split('/')
    const fileName = pathArr[pathArr.length - 1]
    const { userId } = fields
    User.update({
      userAvatar: fileName
    }, {
      where: {
        userId
      }
    })
    res.send({
      code: 0,
      fileName
    });
  });
});

module.exports = router
