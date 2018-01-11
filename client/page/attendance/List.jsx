import React, { Component } from 'react';
import { Table, Input, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import Form from 'ant-form'


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
        name: 'name',
        props: { ...formItemLayout, label: '员工姓名' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'id',
        props: { ...formItemLayout, label: '员工ID' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'department',
        props: { ...formItemLayout, label: '部门' },
        component: <Input />,
      },]
    }

    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '25%',
    }, {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: '25%',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: () => (
        <div>
          <Link to="/attendance/detail">查看详情</Link>
        </div>
      ),
      width: '25%',
    }];
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      id: 32,
      department: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      id: 42,
      department: '西湖区湖底公园1号'
    }];

    this.setState({
      dataSource
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
          onSubmit={(err, values) => { console.log(err || values) }}
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
