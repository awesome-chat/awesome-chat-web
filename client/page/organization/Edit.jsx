import React, { Component } from 'react';
import { Breadcrumb, Input, Table } from 'antd';
import Form from 'ant-form'
import { Link } from 'react-router-dom'

class OrgEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: [],
      depDataSource: []
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
        name: 'name',
        props: { ...formItemLayout, label: '员工姓名' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'owner',
        props: { ...formItemLayout, label: '法定代表人' },
        component: <Input />,
      },],
    }

    this.userColumns = [
      {
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
        dataIndex: 'dep',
        key: 'dep',
        width: '25%',
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => (
          <div>
            <Link to="/org/user/edit">编辑</Link>
          </div>
        ),
        width: '25%',
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
        render: () => (
          <div>
            <Link to="/org/dep/edit">编辑</Link>
          </div>
        ),
        width: '33%',
      },
    ];
  }

  componentDidMount() {
    this.fetchUserDate()
    this.fetchDepData()
  }

  fetchUserDate = () => {
    this.setState({
      userDataSource: [
        {
          name: 1,
          id: 1,
          dep: 1,
        }
      ]
    })
  }

  fetchDepData = () => {
    this.setState({
      depDataSource: [
        {
          depName: 22,
          depId: 22,
        }
      ]
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
        <Form
          formConfig={this.userFormConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
        <Table
          style={{ margin: '20px 0' }}
          dataSource={this.state.userDataSource}
          columns={this.userColumns}
          bordered
        />
        <Form
          formConfig={this.depFormConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
        <Table
          style={{ margin: '20px 0' }}
          dataSource={this.state.depDataSource}
          columns={this.depColumns}
          bordered
        />
      </div>
    )
  }
}


export default OrgEdit;
