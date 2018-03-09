const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const rooms_to_users = sequelize.define('rooms_to_users', {
  mappingId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  roomId: Sequelize.BIGINT(11),
  userId: Sequelize.BIGINT(11),
  roomMemberId: Sequelize.STRING(255),
  isGroup: Sequelize.BIGINT(11),
}, {
  timestamps: false
});

module.exports = rooms_to_users;
