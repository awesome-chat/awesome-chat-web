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
    Room.upsert({
      roomId
    }, {
      plain: true
    }).then((d) => {
      console.log('primary key:', d)
      res.send({
        code: 0,
        roomId
      })
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
    console.log(JSON.parse(JSON.stringify(d)))
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
