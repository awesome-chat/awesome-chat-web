const socketIo = require('socket.io')
const { Message, RoomToUser } = require('../models')

const rooms = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    function broadcastToOnline(roomId, memberIds, content, otherSideName) {
      if (!rooms[roomId]) {
        // room不存在的话就创建并添加
        rooms[roomId] = {}
      }
      socket.join(roomId)
      memberIds.forEach((d) => {
        if (onlineUser[d]) {
          onlineUser[d].join(roomId)
        }
      })
      console.log('broadcast success')
      socket.broadcast.to(roomId).emit('sys', {
        code: 0,
        roomId,
        content,
        otherSideName,
        createTime: Date.parse(new Date())
      });
    }

    function saveToServer(content, userId, roomId, time) {
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

    // 初始化userId
    let currentUserId;

    // 上线
    socket.on('online', (userId) => {
      onlineUser[userId] = socket;
      currentUserId = userId
      console.log('----------------------------')
      console.log('some online')
    });

    // 监听来自客户端的消息
    socket.on('message', (data) => {
      const {
        userId,
        roomId,
        content,
        time,
        userName,
        isGroup = false,
        otherSideName = ''
      } = data
      console.log('data', data)

      if (isGroup) {
        // 群聊
        // membersId: array
        const memberIds = roomId.split('-').filter(d => d !== String(userId))
        let isAllOnline = true;
        let isAllOffline = true;
        memberIds.forEach((d) => {
          if (!onlineUser[d]) {
            isAllOnline = false
          } else {
            isAllOffline = false
          }
        })

        if (isAllOnline) {
          // 所有人都在线
          broadcastToOnline(roomId, memberIds, content, otherSideName)
        } else if (isAllOffline) {
          // 除了自己所有人都不在线
          broadcastToOnline(roomId, memberIds, content, otherSideName)
          saveToServer(content, userId, roomId, time)
        } else {
          // 有人不在线
          console.log('some offline')
          saveToServer(content, userId, roomId, time)
        }
      } else {
        // 单聊
        const otherSideId = roomId.split('-').filter(d => d !== String(userId))[0]
        // 判断对方是否在线
        if (onlineUser[otherSideId]) {
          console.log('roomId', roomId, 'rooms', rooms)
          // 判断该房间是否存在
          if (!rooms[roomId]) {
            rooms[roomId] = {}
          }
          // 将两人加入聊天室
          socket.join(roomId)
          onlineUser[otherSideId].join(roomId)
          // 表示该用户在线
          rooms[roomId][userId] = true
          console.log('broadcast success')
          socket.broadcast.to(roomId).emit('sys', {
            code: 0,
            roomId,
            content,
            otherSideName: userName,
            createTime: Date.parse(new Date())
          });
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
      }
    });

    // 关闭
    socket.on('disconnect', () => {
      console.log('some leave:', currentUserId);
      delete onlineUser[currentUserId]
      // 从房间名单中移除
      // socket.leave(roomId, (err) => {
      //   console.log('leave')
      //   if (err) {
      //     console.log(err);
      //   }
      //   //   var index = rooms[roomId].indexOf(user);
      //   //   if (index !== -1) {
      //   //     rooms[roomId].splice(index, 1);
      //   //     socket.to(roomId).emit('sys', user + '退出了房间');
      //   //   }
      //   // }
      // });
    });
  });
}
