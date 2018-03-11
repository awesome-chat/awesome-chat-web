const socketIo = require('socket.io')
const { Message, RoomToUser, Room, User } = require('../models')
const _ = require('lodash')
const eventproxy = require('eventproxy')

const rooms = {}
const onlineUser = {}

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    function broadcastToOnline({
      roomId,
      otherMemberId,
      roomMemberId,
      content,
      otherSideName,
      sysMessage,
      isPic,
      isRecommend
    }) {
      if (!rooms[roomId]) {
        // room不存在的话就创建并添加
        rooms[roomId] = {}
      }
      socket.join(roomId)
      otherMemberId.forEach((d) => {
        if (onlineUser[d]) {
          onlineUser[d].join(roomId)
        }
      })
      console.log('broadcast success')
      socket.broadcast.to(roomId).emit('sys', {
        code: 0,
        roomId,
        roomMemberId,
        content,
        otherSideName,
        sysMessage: sysMessage ? 1 : 0,
        isPic: isPic ? 1 : 0,
        isRecommend: isRecommend ? 1 : 0,
        createTime: Date.parse(new Date())
      });
    }

    function saveToServer({
      content,
      userId,
      roomId,
      roomMemberId,
      createTime,
      sysMessage,
      isPic,
      isRecommend
    }) {
      Message.upsert({
        // 把聊天记录存在服务端
        sysMessage: sysMessage ? 1 : 0,
        messageContent: content,
        messageFromId: userId,
        messageToId: roomMemberId,
        roomId,
        createTime,
        isPic: isPic ? 1 : 0,
        isRecommend: isRecommend ? 1 : 0,
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
    let joinRoomIds = [];

    // 上线
    socket.on('online', (userId) => {
      onlineUser[userId] = socket;
      currentUserId = userId
      console.log('----------------------------')
      console.log('some online', userId, Object.keys(onlineUser))
    });

    // 监听来自客户端的消息
    socket.on('message', (data) => {
      console.log('---------------')
      console.log('data:', data)
      const {
        userId,
        roomId,
        roomMemberId,
        content,
        createTime = Date.parse(new Date()),
        userName,
        userAvatar,
        isGroup = false,
        isPic = false,
        isRecommend = false
      } = data

      joinRoomIds.push(roomId);

      if (isGroup) {
        // 群聊
        // membersId: array
        const messageItem = _.cloneDeep(data)
        const otherMemberId = roomMemberId.split('-').filter(d => d !== String(userId))
        messageItem.otherMemberId = otherMemberId
        messageItem.isRecommend = isRecommend
        let isAllOnline = true;
        let isAllOffline = true;
        otherMemberId.forEach((d) => {
          if (!onlineUser[d]) {
            isAllOnline = false
          } else {
            isAllOffline = false
          }
        })

        if (isAllOnline) {
          // 所有人都在线
          broadcastToOnline(messageItem)
        } else if (isAllOffline) {
          // 除了自己所有人都不在线
          broadcastToOnline(messageItem)
          saveToServer(messageItem)
        } else {
          // 有人不在线
          saveToServer(messageItem)
        }
      } else {
        console.log('单聊')
        // 单聊
        const otherSideId = roomMemberId.split('-').filter(d => d !== String(userId))[0]
        // 判断对方是否在线
        if (onlineUser[otherSideId]) {
          console.log('在线')
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
            roomMemberId,
            content,
            otherSideAvatar: userAvatar,
            otherSideName: userName,
            isPic: isPic ? 1 : 0,
            isRecommend: isRecommend ? 1 : 0,
            createTime: Date.parse(new Date())
          });
          // socket.emit('sys', content);
        } else {
          console.log('不在线')
          Message.upsert({
            // 把聊天记录存在服务端
            isRecommend: isRecommend ? 1 : 0,
            messageContent: content,
            messageFromId: userId,
            otherSideAvatar: userAvatar,
            messageToId: roomMemberId,
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
      }
    });

    // 关闭
    socket.on('disconnect', () => {
      if (currentUserId) {
        delete onlineUser[currentUserId]
        // 离开所有房间
        joinRoomIds.forEach((d) => {
          socket.leave(d)
        })
        // 更新下线时间
        User.update({
          lastUpdateTime: Date.parse(new Date())
        }, {
          where: { userId: currentUserId },
          plain: true
        }).then((d) => {
          console.log('some leave:', currentUserId);
        }).catch((err) => {
          console.log(err)
        })
        return
      }
      console.log('some leave:', currentUserId);
    });
  });
}
