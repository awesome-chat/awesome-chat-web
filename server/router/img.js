const express = require('express')
const Sequelize = require('sequelize')
const { Company, User } = require('../models')
const path = require('path')
const router = express.Router()
const formidable = require('formidable');

router.post('/upload', (req, res) => {
  console.log('---------')
  var form = new formidable.IncomingForm();
  console.log(path.resolve(__dirname, '../../static/img'))
  form.uploadDir = "/Users/wengwengweng/Code/awesome-chat-web/static/img";
  form.parse(req, (err, fields, files) => {
    const pathArr = files.images.path.split('/')
    const fileName = pathArr[pathArr.length - 1]
    console.log('files', pathArr[pathArr.length - 1]);
    res.send({
      code: 0,
      fileName
    });
  });

});

module.exports = router
