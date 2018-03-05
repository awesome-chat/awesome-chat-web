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
  // 年月
  attendanceYear: Sequelize.BIGINT(11),
  attendanceMonth: Sequelize.BIGINT(11),
  attendanceDate: Sequelize.BIGINT(11),
  // 打卡时间 2017-02-11
  strikeTime: Sequelize.STRING(255),
  // 是否请假
  hasCottage: Sequelize.BIGINT(11),
  // 请假原因
  cottageReason: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = attendance;
