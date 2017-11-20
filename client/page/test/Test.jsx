import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';

const socket = io();

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleClick = () => {
    console.log('in click', socket)
    socket.emit('chat message', this.state.value);
  }

  handleChange = (e) => {
    console.log(e)
    this.setState({ 'value': e.target.value })
  }

  render() {
    return (
      <div>
        <div>This is Test</div>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>submit</button>
      </div>
    )
  }
}

export default Test;