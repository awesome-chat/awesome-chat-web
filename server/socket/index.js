
const socketIo = require('socket.io')
const { Message, RoomToUser } = require('../models')

const roomUser = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    // 获取用户当前的url，从而截取出房间id
    console.log('in connection')
    let roomId = ''

    socket.on('join', (roomId) => {
      console.log('roomId', roomId)
      socket.join(roomId)
    });

    // 监听来自客户端的消息
    socket.on('message', (data) => {
      const {
        userId,
        roomId,
        otherSideId,
        content,
        time
      } = data
      console.log('data', data)
      // 判断对方是否在线
      if (onlineUser[otherSideId]) {
        console.log('online')
        // 判断该房间是否存在
        if (!roomUser[roomId]) {
          roomUser[roomId] = {}
        }
        // 表示该用户在线
        roomUser[roomId][userId] = true
        socket.broadcast.to(roomId).emit('sys', content);
        // socket.emit('sys', content);
      } else {
        console.log('offline')
        Message.upsert({
          // 把聊天记录存在服务端
          messageContent: content,
          messageFromId: userId,
          messageToId: roomId,
          createTime: time
        }, {
          plain: true
        }).then((d) => {
          console.log('success')
        }).catch((err) => {
          console.log(err);
        });
      }
    });

    // 关闭
    socket.on('disconnect', () => {
      // 从房间名单中移除
      socket.leave(roomId, (err) => {
        console.log('leave')
        if (err) {
          console.log(err);
        }
        //   var index = roomUser[roomId].indexOf(user);
        //   if (index !== -1) {
        //     roomUser[roomId].splice(index, 1);
        //     socket.to(roomId).emit('sys', user + '退出了房间');
        //   }
        // }
      });
    });
  });
}
