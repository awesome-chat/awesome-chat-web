const express = require('express')
const Sequelize = require('sequelize')
const { Room, RoomToUser } = require('../models')
const eventproxy = require('eventproxy')

const router = express.Router()

router.get('/from/:userId/to/:otherSideId', (req, res) => {
  const ep = new eventproxy()
  const { userId, otherSideId } = req.params
  const roomId = [userId, otherSideId].sort((a, b) => a - b).join('-')

  ep.on('createRoom', () => {
    let finishUpsert = false;
    let finishBulkCreate = false;

    ep.on('finish', () => {
      if (finishBulkCreate && finishUpsert) {
        res.send({
          code: 0,
          roomId
        })
      }
    })

    Room.upsert({
      roomId
    }, {
      plain: true
    }).then(() => {
      finishBulkCreate = true;
      ep.emit('finish')
    }).catch((err) => {
      console.log(err);
    });

    // 创建room和user的映射
    RoomToUser.bulkCreate([
      { roomId, userId },
      { roomId, userId: otherSideId }
    ], {
      plain: true
    }).then(() => {
      finishUpsert = true;
      ep.emit('finish')
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
