import React, { Component } from 'react';
import { Calendar } from 'antd'


class AttendanceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }

  render() {
    return (
      <div>
        <h1 className="page-title">信息详情</h1>
        <Calendar onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default AttendanceDetail;
