const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const dep = sequelize.define('dep', {
  depId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  depName: Sequelize.STRING(255),
  depOwnerId: Sequelize.BIGINT(11),
  depParentId: Sequelize.BIGINT(11),
  companyId: Sequelize.BIGINT(11),
}, {
  timestamps: false
});

module.exports = dep;
