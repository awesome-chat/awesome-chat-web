const express = require('express')
const Sequelize = require('sequelize')
const { Room, RoomToUser, User } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.post('/create', (req, res) => {
  const ep = new eventproxy()
  const { userId, otherIds, isGroup } = req.body
  const allIds = [userId].concat(otherIds).sort((a, b) => a - b)
  const roomMemberId = allIds.join('-')

  ep.on('finish', (data) => {
    res.send({
      code: 0,
      type: 'create',
      data,
    })
  })

  ep.on('createRoom', () => {
    Room.findOrCreate({
      where: { roomMemberId },
      defaults: { roomMemberId }
    }).spread((room) => {
      // 创建room和user的映射
      const query = allIds.map(userId => ({
        roomId: room.roomId,
        roomMemberId,
        userId,
        isGroup
      }))
      RoomToUser.bulkCreate(query, {
        plain: true
      }).then(() => {
        ep.emit('finish', room)
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  // 判断房间是否存在
  Room.findAll({
    where: {
      roomMemberId
    },
  }).then((d) => {
    if (d.length > 0) {
      res.send({
        code: 0,
        data: d[0],
        type: 'find',
      })
      return
    }
    ep.emit('createRoom')
  })
});

router.get('/group/list/:userId', (req, res) => {
  const { userId } = req.params
  RoomToUser.findAll({
    where: {
      userId: parseInt(userId, 10),
      isGroup: 1
    },
    include: [{
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
});

router.get('/group/detail/:roomId', (req, res) => {
  const { roomId } = req.params
  RoomToUser.findAll({
    where: {
      roomId
    },
    include: [{
      model: User,
      where: { userId: Sequelize.col('user.userId') }
    }]
  }).then((d) => {
    res.send({
      code: 0,
      data: JSON.parse(JSON.stringify(d))
    })
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/group/leave/', (req, res) => {
  const { roomId, userId, roomMemberId } = req.body
  console.log(req.params)
  const newRoomMemberId = roomMemberId.split('-').filter(d => d !== String(userId)).join('-')
  Room.update({
    roomMemberId: newRoomMemberId
  }, {
    where: {
      roomId
    }
  }).then((e) => {
    RoomToUser.destroy({
      where: {
        roomId,
        userId
      }
    }).then((d) => {
      res.send({
        code: 0,
        data: JSON.parse(JSON.stringify(d))
      })
    })
  })
});

module.exports = router
