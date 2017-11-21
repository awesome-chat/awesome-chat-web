import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

const socket = io();

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      reply: []
    }
  }

  componentDidMount() {
    socket.on('chat message', (msg) => {
      console.log('msg',msg)
      const newReply = this.state.reply;
      newReply.push(msg)
      this.setState({
        reply: newReply
      })
    });
  }

  handleClick = () => {
    console.log('in click', this.state.value)
    socket.emit('chat message', this.state.value);
    this.setState({ 'value': '' })
  }

  handleChange = (e) => {
    this.setState({ 'value': e.target.value })
  }

  render() {
    return (
      <div>
        <div style={{ height: 400, background: '#000', color: '#fff' }}>
          {this.state.reply.map((d,i) => <li key={i}>{d}</li>)}
        </div>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>submit</button>
      </div>
    )
  }
}

export default Test;