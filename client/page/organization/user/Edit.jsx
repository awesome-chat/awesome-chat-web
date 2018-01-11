import React, { Component } from 'react';
import { Input, Breadcrumb } from 'antd';
import Form from 'ant-form'

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 }
    }

    this.formConfig = {
      buttons: {
        props: {},
        items: [{
          key: 'search',
          props: {
            style: { marginLeft: '190px' },
            type: 'primary',
            htmlType: 'submit',
          },
          text: '修改',
        }],
      },
      items: [{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入员工姓名!', whitespace: true }],
        },
        name: 'name',
        props: { ...formItemLayout, label: '员工姓名' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
        },
        name: 'Id',
        props: { ...formItemLayout, label: '员工ID' },
        component: <span>test-user-id</span>,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入上级!', whitespace: true }],
        },
        name: 'userParent',
        props: { ...formItemLayout, label: '上级' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
        },
        name: 'tel',
        props: { ...formItemLayout, label: '联系电话' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入所属部门!', whitespace: true }],
        },
        name: 'depID',
        props: { ...formItemLayout, label: '所属部门' },
        component: <Input />,
      },],
    }
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>员工信息修改</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">员工信息修改</h1>
        <Form
          formConfig={this.formConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
      </div>
    )
  }
}


export default UserEdit;
