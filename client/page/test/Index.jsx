import React, { Component } from 'react';
import { Input, Card, Button, Select, Icon } from 'antd';
import _ from 'lodash'
import io from 'socket.io-client';
import api from '@client/utils/api'

const socket = io('http://localhost:3000');

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      messages: [],
      userList: [],
      currentUser: '',
      otherSideUser: '',
      isOnline: false
    };
  }

  componentDidMount() {
    api.getUserList().then(({ data }) => {
      this.setState({
        userList: data.data
      })
    })
  }

  sendMessage = (data = {}) => {
    socket.emit('join', data.roomId, data.userId)
    socket.emit('message', data)
  }

  handleSubmit = () => {
    const {
      messages,
      content,
    } = this.state;

    const {
      currentUserDetail,
      otherSideUserDetail
    } = this.getSelect()

    api.createRoom({
      userId: currentUserDetail.userId,
      otherIds: [otherSideUserDetail.userId]
    }).then(({ data }) => {
      if (data.code === 0) {
        const messageItem = {
          userId: currentUserDetail.userId,
          userName: currentUserDetail.userName,
          roomId: data.data.roomId,
          roomMemberId: data.data.roomMemberId,
          userAvatar: currentUserDetail.userAvatar,
          content,
          time: Date.parse(new Date())
        }
        this.sendMessage(messageItem)
        const newMessage = _.cloneDeep(messages)
        newMessage.push({
          userName: currentUserDetail.userName,
          content
        })
        this.setState({
          messages: newMessage
        })
      }
    })
  }

  handleOnline = () => {
    const {
      currentUserDetail,
      otherSideUserDetail
    } = this.getSelect()
    socket.emit('online', currentUserDetail.userId)
    socket.on('sys', (data) => {
      const newMessage = _.cloneDeep(this.state.messages)
      newMessage.push({
        userName: otherSideUserDetail.userName,
        content: data.content
      })
      this.setState({
        messages: newMessage
      })
    })
    this.setState({
      isOnline: true
    })
  }

  getSelect = () => {
    const {
      userList,
      currentUser,
      otherSideUser
    } = this.state
    let currentUserDetail;
    let otherSideUserDetail;
    userList.forEach((d) => {
      if (String(d.userId) === currentUser) {
        currentUserDetail = d
      }
      if (String(d.userId) === otherSideUser) {
        otherSideUserDetail = d
      }
    })
    return {
      currentUserDetail,
      otherSideUserDetail
    }
  }

  handleChangeState = (type, e) => {
    this.setState({
      [type]: e.target ? e.target.value : e
    })
  }

  render() {
    const {
      content,
      userList,
      messages,
      currentUser,
      otherSideUser,
      isOnline
    } = this.state;
    return (
      <div className="login">
        <h1>Test</h1>
        <div className="form-block">
          <Card>
            <div style={{
              marginBottom: '10px',
              height: '200px',
              overflow: 'scroll',
              background: '#eee',
              borderRadius: '5px'
            }}>
              <ul>
                {messages.map((d, i) => (
                  <li style={{ marginBottom: '5px' }}>
                    <p>{`${d.userName}: ${d.content}`}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>当前用户：</div>
            <Select value={currentUser} style={{ width: '100%', marginBottom: '10px' }} onChange={this.handleChangeState.bind(this, 'currentUser')}>
              {userList.map(d => (
                <Select.Option
                  kry={String(d.userId)}
                  disabled={otherSideUser === String(d.userId)}
                  value={String(d.userId)}
                >
                  {d.userName}
                </Select.Option>
              ))}
            </Select>
            <div>对方用户：</div>
            <Select value={otherSideUser} style={{ width: '100%', marginBottom: '10px' }} onChange={this.handleChangeState.bind(this, 'otherSideUser')}>
              {userList.map(d => (
                <Select.Option
                  kry={String(d.userId)}
                  disabled={currentUser === String(d.userId)}
                  value={String(d.userId)}
                >
                  {d.userName}
                </Select.Option>
              ))}
            </Select>
            <div>聊天内容：</div>
            <Input onChange={this.handleChangeState.bind(this, 'content')} style={{ margin: '0 0 15px 0' }} value={content} />
            <Button onClick={this.handleSubmit}>提交</Button>
            <Button style={{ marginLeft: '10px' }} onClick={this.handleOnline}>
              {isOnline ? <span><Icon type="check-circle" /> 已上线</span> : '上线'}
            </Button>
          </Card>
        </div>
      </div>
    )
  }
}


export default Test;
