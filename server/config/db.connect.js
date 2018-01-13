const Sequelize = require('sequelize');
// 引入数据库配置文件
const dbConfig = require('./db.config').mysql;

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;