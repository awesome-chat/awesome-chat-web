const express = require('express')
const Sequelize = require('sequelize')
const { Room, RoomToUser } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.post('/create', (req, res) => {
  const ep = new eventproxy()
  const { userId, otherIds } = req.body
  const allIds = [userId].concat(otherIds).sort((a, b) => a - b)
  console.log(allIds, userId, otherIds)
  const roomId = allIds.join('-')

  ep.on('createRoom', () => {

    ep.on('finish', () => {
      res.send({
        code: 0,
        roomId
      })
    })

    Room.upsert({
      roomId
    }, {
      plain: true
    }).then(() => {
      // 创建room和user的映射
      const query = allIds.map(d => ({ roomId, userId:d }))
      RoomToUser.bulkCreate(query, {
        plain: true
      }).then(() => {
        ep.emit('finish')
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  console.log('roomId', roomId)
  Room.findAll({
    where: {
      roomId
    },
  }).then((d) => {
    if (d > 0) {
      res.send({
        code: 0,
        roomId
      })
    } else {
      ep.emit('createRoom')
    }
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router
