
const socketIo = require('socket.io')
const { Message, RoomToUser } = require('../models')

const roomUser = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {

    // 上线
    socket.on('online', (userId) => {
      onlineUser[userId] = true;
      console.log('----------------------------')
      console.log('some online', onlineUser)
    });

    // 加入房间
    socket.on('join', (roomId, userId) => {
      if (roomUser.roomId) {
        roomUser[roomId][userId] = true
      } else {
        roomUser[roomId] = {
          [userId]: true
        }
      }
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
      // 判断对方是否在线
      console.log('data', data)
      if (onlineUser[String(otherSideId)]) {
        console.log('roomId', roomId, 'roomUser', roomUser)
        // 判断该房间是否存在
        if (!roomUser[roomId]) {
          roomUser[roomId] = {}
        }
        // 表示该用户在线
        roomUser[roomId][userId] = true
        console.log('broadcast success')
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
    // socket.on('disconnect', () => {
    //   // 从房间名单中移除
    //   socket.leave(roomId, (err) => {
    //     console.log('leave')
    //     if (err) {
    //       console.log(err);
    //     }
    //     //   var index = roomUser[roomId].indexOf(user);
    //     //   if (index !== -1) {
    //     //     roomUser[roomId].splice(index, 1);
    //     //     socket.to(roomId).emit('sys', user + '退出了房间');
    //     //   }
    //     // }
    //   });
    // });
  });
}
