const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const user = sequelize.define('user', {
  userId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  userName: Sequelize.STRING(255),
  userMisId: Sequelize.STRING(255),
  userAvatar: Sequelize.STRING(255),
  userTel: Sequelize.STRING(255),
  userPwd: Sequelize.STRING(255),
  userSign: Sequelize.STRING(255),
  userExt: Sequelize.STRING(255),
  userWorkPlace: Sequelize.STRING(255),
  userSex: Sequelize.BIGINT(11),
  companyId: Sequelize.BIGINT(11),
  depId: Sequelize.BIGINT(11),
  userRegisterTime: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = user;
