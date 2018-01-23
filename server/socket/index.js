
const socketIo = require('socket.io')

const roomUser = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    // 获取用户当前的url，从而截取出房间id
    console.log('in connection')
    let roomId = ''

    socket.on('join', (data) => {
      console.log(typeof data)


    });

    // 监听来自客户端的消息
    socket.on('message', (data) => {
      const {
        userId,
        roomId,
        otherSideId,
        msg
      } = data
      console.log('data', data)
      console.log('roomUser', roomUser)
      console.log('onlineUser', onlineUser)
      // 判断对方是否在线
      if (onlineUser[otherSideId]) {
        // 判断该房间是否存在
        if (!roomUser[roomId]) {
          roomUser[roomId] = {}
        }
        // 表示该用户在线
        roomUser[roomId][userId] = true

        socket.to(roomId).emit('sys', msg);
      } else {
        // 把聊天记录存在服务端
      }
    });

    // 关闭
    socket.on('disconnect', () => {
      // 从房间名单中移除
      socket.leave(roomId, (err) => {
        if (err) {
          log.error(err);
        } else {
          var index = roomUser[roomId].indexOf(user);
          if (index !== -1) {
            roomUser[roomId].splice(index, 1);
            socket.to(roomId).emit('sys', user + '退出了房间');
          }
        }
      });
    });
  });
}
