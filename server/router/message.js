const express = require('express')
const Sequelize = require('sequelize')
const { Message, RoomToUser } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.get('/:userId', (req, res) => {
  // 获取该用户所有未读信息
  RoomToUser.findAll({
    where: {
      userId: req.params.userId
    },
    include: [{
      model: Message,
      where: { roomId: Sequelize.col('message.messageToId') }
    }]
  }).then((d) => {
    console.log(JSON.stringify(d))
    res.send(JSON.stringify(d))
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router
