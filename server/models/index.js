const Company = require('./company')
const User = require('./user')
const Dep = require('./dep')

Company.belongsTo(User, { foreignKey: 'companyOwnerId', targetKey: 'userId' });

module.exports = {
  Company,
  User,
  Dep
}