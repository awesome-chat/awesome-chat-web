const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const message = sequelize.define('message', {
  messageId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  messageContent: Sequelize.STRING(255),
  messageFromId: Sequelize.BIGINT(11),
  messageToId: Sequelize.BIGINT(11),
  createTime: Sequelize.BIGINT(20),
  isPic: Sequelize.BIGINT(11),
}, {
  timestamps: false
});

module.exports = message;
