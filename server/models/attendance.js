const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const attendance = sequelize.define('attendance', {
  attendanceId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  userId: Sequelize.BIGINT(11),
  strikeTime: Sequelize.STRING(255),
  hasCottage: Sequelize.BIGINT(11),
  cottageReason: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = attendance;
