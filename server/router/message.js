const express = require('express')
const Sequelize = require('sequelize')
const { Message, RoomToUser, User, Room } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.get('/:userId/after/:lastUpdateTime', (req, res) => {
  const ep = new eventproxy();
  const { userId, lastUpdateTime } = req.params;
  // 获取该用户所有未读信息
  ep.on('finish', (roomMemberId) => {
    const newRoomIds = roomMemberId.map(d => ({ messageToId: d.roomMemberId }))
    Message.findAll({
      where: {
        [Sequelize.Op.and]: {
          [Sequelize.Op.or]: newRoomIds,
          createTime: {
            [Sequelize.Op.and]: {
              [Sequelize.Op.gte]: Number(lastUpdateTime),
              [Sequelize.Op.lte]: Number(Date.parse(new Date()))
            }
          }
        },
      },
      include: [{
        model: User,
        attributes: ['userName', 'userId'],
        where: { messageFromId: Sequelize.col('user.userId') }
      }, {
        model: Room,
        where: { roomId: Sequelize.col('room.roomId') }
      }]
    }).then((d) => {
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
      userId
    },
    attributes: ['roomMemberId']
  }).then((d) => {
    ep.emit('finish', JSON.parse(JSON.stringify(d)))
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router
