const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const room = sequelize.define('room', {
  roomId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  roomNamet: Sequelize.STRING(255),
  roomIntro: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = room;
