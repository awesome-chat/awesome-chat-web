import React, { Component } from 'react';
import { Input, Breadcrumb } from 'antd';
import Form from 'ant-form'

class DepOrg extends Component {
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
          rules: [{ required: true, message: '请输入部门名称!', whitespace: true }],
        },
        name: 'depName',
        props: { ...formItemLayout, label: '部门名称' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入部门ID!', whitespace: true }],
        },
        name: 'depId',
        props: { ...formItemLayout, label: '部门ID' },
        component: <span>testId</span>,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入部门负责人!', whitespace: true }],
        },
        name: 'depOwner',
        props: { ...formItemLayout, label: '部门负责人' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入上级部门!', whitespace: true }],
        },
        name: 'depParent',
        props: { ...formItemLayout, label: '上级部门' },
        component: <Input />,
      },],
    }
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>部门信息修改</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">部门信息修改</h1>
        <Form
          formConfig={this.formConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
      </div>
    )
  }
}


export default DepOrg;
