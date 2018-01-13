const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const company = sequelize.define('company', {
  companyId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  companyName: Sequelize.STRING(255),
  companyOwnerId: Sequelize.BIGINT(11),
  companyTel: Sequelize.STRING(255),
  companyMail: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = company;
