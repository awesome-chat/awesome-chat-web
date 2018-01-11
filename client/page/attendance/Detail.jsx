import React, { Component } from 'react';
import { Calendar, Badge, Breadcrumb } from 'antd'
import moment from 'moment'

class AttendanceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  }

  onSelect = (value) => {
    console.log(value)
  }

  dateCellRender = (value) => {
    const weekday = moment(value).weekday()
    // 排除周末
    const isWeekend = (weekday !== 0 && weekday !== 6)
    // 今天之前
    const isBeforeTodat = moment(value).format('x') < Date.parse(new Date())
    return (
      isWeekend && isBeforeTodat ? (
        <ul className="events">
          <li>
            <Badge status="success" text="正常" />
          </li>
          {/* <li>
            <Badge status="error" text="考勤异常" />          
          </li>
          <li>
            <Button>申诉</Button>
          </li> */}
        </ul>
      ) : null
    );
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>考勤详情</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">考勤详情</h1>
        <Calendar
          dateCellRender={this.dateCellRender}
          onPanelChange={this.onPanelChange}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default AttendanceDetail;
