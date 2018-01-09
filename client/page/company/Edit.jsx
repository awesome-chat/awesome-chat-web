import React, { Component } from 'react';
import { Input, Select, Button, AutoComplete, DatePicker, Upload, message, Icon } from 'antd';
import Form from 'ant-form'
import './company.css';

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class CompanyEdit extends Component {
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
            size: 'large',
          },
          text: '修改',
        }],
      },
      items: [{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
        },
        name: 'name',
        props: { ...formItemLayout, label: '公司名' },
        component: <Input />,
      },{
        opts: {
          initialValue: '',
          rules: [{ required: true, message: '请输入法定代表人!', whitespace: true }],
        },
        name: 'owner',
        props: { ...formItemLayout, label: '法定代表人' },
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
          rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
        },
        name: 'mail',
        props: { ...formItemLayout, label: '联系电话' },
        component: <Input />,
      },],
    }
  }

  render() {
    return (
      <div>
        <h1 className="page-title">信息修改</h1>
        <Form
          formConfig={this.formConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
      </div>
    )
  }
}


export default CompanyEdit;
