const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const admin = sequelize.define('admin', {
  adminId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  adminName: Sequelize.STRING(255),
  adminPwd: Sequelize.STRING(255),
  companyId: Sequelize.BIGINT(11),
}, {
  timestamps: false
});

module.exports = admin;
