const Sequelize = require('sequelize');
const sequelize = require('../config/db.connect.js');

const feedback = sequelize.define('feedback', {
  fbId: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  fbUserId: Sequelize.BIGINT(11),
  fbUserName: Sequelize.STRING(255),
  fbContent: Sequelize.STRING(255),
  fbType: Sequelize.STRING(255),
}, {
  timestamps: false
});

module.exports = feedback;
