import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    }
  }

  render() {
    return <div>This is Info</div>
  }
}

export default Info;