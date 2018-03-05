const express = require('express')
const Sequelize = require('sequelize')
const { Company, User, Attendance } = require('../models')
const path = require('path')
const router = express.Router()
const formidable = require('formidable');

router.post('/cottage', (req, res) => {
  const {
    days,
    cottageReason,
  } = req.body;
  const records = days.map(d => ({
    ...d,
    cottageReason,
    strikeTime: Date.parse(new Date()),
    hasCottage: 1,
  }))
  Attendance.findAll({
    where: {
      [Sequelize.Op.or]: days
    }
  }).then((d) => {
    console.log(d.length)
    if (d.length > 0) {
      res.send({
        code: 1,
        msg: '该时间段内有日期已请假'
      })
      return
    }
    Attendance.bulkCreate(records, {
      plain: true
    }).then((d) => {
      res.send({
        code: 0,
        msg: '请假成功'
      })
    })
  })
})


router.post('/signin', (req, res) => {
  const {
    location,
    connectionInfo,
    userId
  } = req.body;
  const latitudeVerified = (location.latitude <= 38 && location.latitude >= 37)
  const longitudeVerified = (location.longitude <= -122 && location.longitude >= -123)
  if (!latitudeVerified || !longitudeVerified) {
    res.send({
      code: 1,
      msg: '所在位置不在打卡区域内'
    })
    return
  }
  if (connectionInfo.type !== 'wifi') {
    res.send({
      code: 1,
      msg: '未连接至打卡选定wifi'
    })
    return
  }
  const attendanceYear = new Date().getFullYear();
  const attendanceMonth = new Date().getMonth() + 1;
  const attendanceDate = new Date().getDate();
  Attendance.findAll({
    where: {
      userId,
      attendanceYear,
      attendanceMonth,
      attendanceDate,
    }
  }).then((d) => {
    console.log('ddddd:', d.length, d)
    if (d.length > 0) {
      res.send({
        code: 1,
        msg: '今日已打卡'
      })
      return
    }
    Attendance.upsert({
      userId,
      strikeTime: Date.parse(new Date()),
      attendanceYear,
      attendanceMonth,
      attendanceDate,
    }).then((d) => {
      res.send({
        code: 0,
        msg: '打卡成功'
      })
    })
  })
});

router.post('/detail', (req, res) => {
  const {
    userId,
    attendanceMonth,
    attendanceYear
  } = req.body
  Attendance.findAll({
    where: {
      userId,
      attendanceMonth,
      attendanceYear
    }
  }).then((d) => {
    res.send({
      code: 0,
      data: JSON.parse(JSON.stringify(d))
    })
  })
})

module.exports = router
