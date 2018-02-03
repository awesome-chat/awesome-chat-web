const socketIo = require('socket.io')
const { Message, RoomToUser, Room } = require('../models')
const eventproxy = require('eventproxy')
const rooms = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    function broadcastToOnline(roomId, memberIds, content, otherSideName, sysMessage, isPic) {
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
        sysMessage: sysMessage ? 1 : 0,
        isPic: isPic ? 1 : 0,
        createTime: Date.parse(new Date())
      });
    }

    function saveToServer(content, userId, roomId, createTime, sysMessage, isPic) {
      Message.upsert({
        // 把聊天记录存在服务端
        sysMessage: sysMessage ? 1 : 0,
        messageContent: content,
        messageFromId: userId,
        messageToId: roomId,
        createTime,
        isPic: isPic ? 1 : 0,
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

    // 创建群
    socket.on('createGroup', (data) => {
      const ep = new eventproxy()
      const { userId, otherIds, content, otherSideName, isGroup, sysMessage, createTime } = data
      const allIds = [userId].concat(otherIds).sort((a, b) => a - b)
      console.log(allIds, userId, otherIds)
      const roomId = allIds.join('-')
      ep.on('createRoom', () => {
        Room.upsert({
          roomId
        }, {
          plain: true
        }).then(() => {
          // 创建room和user的映射
          const query = allIds.map(d => ({ roomId, userId:d }))
          RoomToUser.bulkCreate(query, {
            plain: true
          }).then(() => {
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
              saveToServer(content, userId, roomId, createTime)
            } else {
              // 有人不在线
              saveToServer(content, userId, roomId, createTime)
            }
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
      Room.findAll({
        where: {
          roomId
        },
      }).then((d) => {
        if (d > 0) {
          res.send({
            code: 0,
            roomId
          })
        } else {
          ep.emit('createRoom')
        }
      }).catch((err) => {
        console.log(err);
      });
    });

    // 上线
    socket.on('online', (userId) => {
      onlineUser[userId] = socket;
      currentUserId = userId
      console.log('----------------------------')
      console.log('some online', userId, Object.keys(onlineUser))
    });

    // 监听来自客户端的消息
    socket.on('message', (data) => {
      const {
        userId,
        roomId,
        content,
        createTime,
        userName,
        isGroup = false,
        otherSideName = '',
        isPic,
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
          broadcastToOnline(roomId, memberIds, content, otherSideName, isPic)
        } else if (isAllOffline) {
          // 除了自己所有人都不在线
          broadcastToOnline(roomId, memberIds, content, otherSideName, isPic)
          saveToServer(content, userId, roomId, createTime, isPic)
        } else {
          // 有人不在线
          saveToServer(content, userId, roomId, createTime, isPic)
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
            isPic: isPic ? 1 : 0,
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
            createTime: createTime,
            isPic: isPic ? 1 : 0,
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
    });
  });
}
