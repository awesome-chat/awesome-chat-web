const express = require('express')
const Sequelize = require('sequelize')
const { Message, RoomToUser, User } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.get('/:userId', (req, res) => {
  const ep = new eventproxy();
  // 获取该用户所有未读信息
  ep.on('finish', (roomIds) => {
    console.log(roomIds)
    const newRoomIds = roomIds.map(d => ({ messageToId: d.roomId }))
    console.log(newRoomIds)
    Message.findAll({
      where: {
        [Sequelize.Op.or]: newRoomIds
      },
      include: [{
        model: User,
        attributes: ['userName', 'userId'],
        where: { messageFromId: Sequelize.col('user.userId') }
      }]
    }).then((d) => {
      console.log('return',JSON.parse(JSON.stringify(d)))
      res.send({
        code: 0,
        data: JSON.parse(JSON.stringify(d))
      })
    }).catch((err) => {
      console.log(err);
    });
  })
  // 获取roomId
  RoomToUser.findAll({
    where: {
      userId: req.params.userId
    },
    attributes: ['roomId']
  }).then((d) => {
    console.log('d', JSON.parse(JSON.stringify(d)))
    ep.emit('finish', JSON.parse(JSON.stringify(d)))
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router
