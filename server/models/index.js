const Company = require('./company')
const User = require('./user')
const Dep = require('./dep')
const Admin = require('./admin')
const Message = require('./message')
const Room = require('./room')
const RoomToUser = require('./room_to_user')

Company.belongsTo(User, { foreignKey: 'companyOwnerId', targetKey: 'userId' });
Dep.belongsTo(User, { foreignKey: 'depOwnerId', targetKey: 'userId' });
User.belongsTo(Dep, { foreignKey: 'depId', targetKey: 'depId' });
Dep.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'companyId' });

module.exports = {
  Company,
  User,
  Dep,
  Admin,
  Message,
  Room,
  RoomToUser,
}