import React, { Component } from 'react';
import { Table, Input, Breadcrumb, message } from 'antd'
import { Link } from 'react-router-dom'
import Form from 'ant-form'
import api from '@client/utils/api'


class AttendanceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }

    this.formConfig = {
      formProps: {
        layout: 'inline'
      },
      buttons: {
        props: {},
        items: [{
          key: 'search',
          props: {
            style: {},
            type: 'primary',
            htmlType: 'submit',
          },
          text: '查询',
        }],
      },
      items: [{
        opts: {
          initialValue: '',
        },
        name: 'userName',
        props: { ...formItemLayout, label: '员工姓名' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'userId',
        props: { ...formItemLayout, label: '员工ID' },
        component: <Input />,
      },]
    }

    this.columns = [{
      title: '姓名',
      dataIndex: 'userName',
      width: '33%',
    }, {
      title: 'ID',
      dataIndex: 'userId',
      width: '33%',
    }, {
      title: '部门',
      dataIndex: 'dep.depName',
      key: 'dep.depName',
      width: '25%',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (t, r) => (
        <div>
          <Link to={`/attendance/detail/${r.userId}`}>查看详情</Link>
        </div>
      ),
      width: '25%',
    }];
  }


  handleUserSubmit = (err, values) => {
    if (err) {
      return
    }
    console.log(values)
    api.getUserList({
      ...values
    }).then(({ data }) => {
      if (data.code === 0) {
        this.setState({
          dataSource: data.data
        })
        message.success('查询成功')
      } else {
        message.success('查询失败请重试')
      }
    })
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>考勤查询</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">考勤查询</h1>
        <Form
          formConfig={this.formConfig}
          onSubmit={this.handleUserSubmit}
        />
        <Table
          style={{ marginTop: '20px' }}
          dataSource={this.state.dataSource}
          columns={this.columns}
          bordered
        />
      </div>
    );
  }
}

export default AttendanceList;
