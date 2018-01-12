const express = require('express')
const fs = require('fs');
const path = require('path');

const router = express.Router()

// 静态文件
const staticDir = path.join(__dirname, '../../static');
const buildDir = path.join(__dirname, '../../build');
router.get('/', (req, res) => {
  const filePath = `${staticDir}/index.html`;
  res.sendFile(filePath);
});

router.get('/build/*', (req, res) => {
  const filePath = `${buildDir}${res.url.split('/build')[1]}`;
  res.sendFile(filePath);
});

router.get('/static/*', (req, res) => {
  const filePath = `${staticDir}${res.url.split('/static')[1]}`;
  res.sendFile(filePath);
});

router.get('/test', (req, res) => {
  res.body = 1111222
});

module.exports = router;
