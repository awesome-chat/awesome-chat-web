import React, { Component } from 'react';
import { Calendar, Badge, Breadcrumb, message } from 'antd'
import moment from 'moment'
import api from '@client/utils/api'

class AttendanceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      records: {}
    }
    this.userId = props.match.params.userId;
  }

  componentDidMount() {
    const month = new Date().getMonth + 1;
    const year = new Date().getFullYear + 1;
    this.fetchData(year, month)
  }

  fetchData = (attendanceYear, attendanceMonth) => {
    api.getAttendance({
      userId: this.userId,
      attendanceMonth,
      attendanceYear
    }).then(({ data }) => {
      if (data.code === 0) {
        const records = {}
        data.data.forEach((d) => {
          records[d.attendanceDate] = {
            strikeTime: d.strikeTime,
            cottageReason: d.cottageReason
          }
        })
        this.setState({
          records
        }, () => {
          this.forceUpdate()
        })
      } else {
        message.info('查询失败')
      }
    })
  }

  onPanelChange = (value, mode) => {
    console.log('onPanelChange:', value);
    const year = value.year()
    const month = value.month() + 1
    console.log(year, month)
    this.fetchData(year, month)
  }

  dateCellRender = (value) => {
    const { records } = this.state;
    const weekday = moment(value).weekday()
    const date = parseInt(moment(value).format('DD'), 10)
    // console.log('value:', moment(value).format('YYYY MM DD'))
    // 排除周末
    const isNotWeekend = (weekday !== 5 && weekday !== 6)
    // 今天之前
    const isBeforeToday = moment(value).format('x') < Date.parse(new Date())
    // 是否打卡
    const isStrike = records[date] && records[date].strikeTime
    // 是否请假
    const isCottage = records[date] && records[date].cottageReason
    console.log(records, isNotWeekend, isBeforeToday, isStrike, isCottage)

    return (
      isNotWeekend && isBeforeToday ? (
        isStrike ? (
          <ul className="events">
            <li>
              <Badge status="success" text="正常" />
            </li>
          </ul>
        ) : (
          isCottage ? (
            <ul className="events">
              <li>
                <Badge status="processing" text="已请假" />
              </li>
            </ul>
          ) : (
            <ul className="events">
              <li>
                <Badge status="warning" text="考勤异常" />
              </li>
            </ul>
          )
        )
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
        />
      </div>
    );
  }
}

export default AttendanceDetail;
