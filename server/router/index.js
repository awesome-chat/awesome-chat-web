const express = require('express')
const fs = require('fs');
const path = require('path');

const router = express.Router()

// 静态文件
const staticDir = path.join(__dirname, '../../static');

// 打包文件
const buildDir = path.join(__dirname, '../../build');

router.get('/', (req, res) => {
  const filePath = `${staticDir}/index.html`;
  res.sendFile(filePath);
});

router.get('/build/*', (req, res) => {
  const filePath = `${buildDir}${req.url.split('/build')[1]}`;
  res.sendFile(filePath);
});

router.get('/static/*', (req, res) => {
  const filePath = `${staticDir}${req.url.split('/static')[1]}`;
  res.sendFile(filePath);
});

router.get('/test', (req, res) => {
  res.body = 1111222
});

module.exports = router;
