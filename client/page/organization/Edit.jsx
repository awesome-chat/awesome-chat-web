import React, { Component } from 'react';
import { Breadcrumb, Input, Table, Spin, Button, message } from 'antd';
import Form from 'ant-form'
import { Link } from 'react-router-dom'
import api from '@client/utils/api'

class OrgEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: [],
      depDataSource: [],
      loadingUser: false,
      loadingDep: false,
    };
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }

    this.userFormConfig = {
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
      },],
    }

    this.userColumns = [
      {
        title: '姓名',
        dataIndex: 'userName',
        width: '33%',
      }, {
        title: 'ID',
        dataIndex: 'userId',
        width: '33%',
      }, {
        title: '操作',
        dataIndex: 'operate',
        render: (t, d) => (
          <div>
            <Link to={`/org/user/edit/${d.userId}`}>编辑</Link>
          </div>
        ),
        width: '33%',
      },
    ];

    this.depFormConfig = {
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
        name: 'depName',
        props: { ...formItemLayout, label: '部门名称' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'depId',
        props: { ...formItemLayout, label: '部门ID' },
        component: <Input />,
      },],
    }

    this.depColumns = [
      {
        title: '部门名称',
        dataIndex: 'depName',
        key: 'depName',
        width: '33%',
      }, {
        title: '部门ID',
        dataIndex: 'depId',
        key: 'depId',
        width: '33%',
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (t, d) => (
          <div>
            <Link to={`/org/dep/edit/${d.depId}`}>编辑</Link>
          </div>
        ),
        width: '33%',
      },
    ];
  }

  handleUserSubmit = (err, values) => {
    if (err) {
      return
    }
    this.setState({
      loadingUser: true,
    })
    api.getUserList({
      ...values
    }).then(({ data }) => {
      if (data.code === 0) {
        this.setState({
          userDataSource: data.data
        })
        message.success('查询成功')
      } else {
        message.success('查询失败请重试')
      }
      this.setState({
        loadingUser: false,
      })
    })
  }

  handleDepSubmit = (err, values) => {
    if (err) {
      return
    }
    this.setState({
      loadingUser: true,
    })
    api.getDepList({
      ...values
    }).then(({ data }) => {
      if (data.code === 0) {
        this.setState({
          depDataSource: data.data
        })
        message.success('查询成功')
      } else {
        message.success('查询失败请重试')
      }
      this.setState({
        loadingUser: false,
      })
    })
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>组织架构修改</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">组织架构修改</h1>
        <h2>
          <span>员工相关</span>
          <Link to="/org/user/add">
            <Button style={{ marginLeft: '20px' }}>新增</Button>
          </Link>
        </h2>
        <Form
          formConfig={this.userFormConfig}
          onSubmit={this.handleUserSubmit}
        />
        <Spin spinning={this.state.loadingUser}>
          <Table
            rowKey="userId"
            style={{ margin: '20px 0 50px 0' }}
            dataSource={this.state.userDataSource}
            columns={this.userColumns}
            bordered
            pagination={false}
          />
        </Spin>
        <h2>
          <span>部门相关</span>
          <Link to="/org/dep/add">
            <Button style={{ marginLeft: '20px' }}>新增</Button>
          </Link>
        </h2>
        <Form
          formConfig={this.depFormConfig}
          onSubmit={this.handleDepSubmit}
        />
        <Spin spinning={this.state.loadingDep}>
          <Table
            rowKey="depId"
            style={{ margin: '20px 0' }}
            dataSource={this.state.depDataSource}
            columns={this.depColumns}
            bordered
            pagination={false}
          />
        </Spin>
      </div>
    )
  }
}


export default OrgEdit;
