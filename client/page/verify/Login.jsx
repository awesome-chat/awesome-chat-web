import React, { Component } from 'react';
import { Input, Card, message, Spin } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'
import './login.scss'

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleSubmit = (err, values) => {
    if (err) {
      return
    }
    this.setState({
      loading: true,
    })
    api.verifyAdmin({
      ...values
    }).then(({ data }) => {
      if (data.code === 0) {
        message.success('操作成功')
        this.props.history.push('/')
      } else {
        message.success('操作失败请重试')
      }
      this.setState({
        loading: false,
      })
    })
  }

  freshForm = () => {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    this.formConfig = {
      buttons: {
        props: {},
        items: [{
          key: 'search',
          props: {
            style: { marginLeft: '160px' },
            type: 'primary',
            htmlType: 'submit',
          },
          text: '登录',
        }],
      },
      items: [{
        opts: {
          rules: [{ required: true, message: '请输入管理员账号!', whitespace: true }],
        },
        name: 'adminName',
        props: { ...formItemLayout, label: '账号' },
        component: <Input />,
      },{
        opts: {
          rules: [{ required: true, message: '请输入管理员密码!', whitespace: true }],
        },
        name: 'adminPwd',
        props: { ...formItemLayout, label: '密码' },
        component: <Input />,
      },],
    }
  }

  render() {
    this.freshForm()

    return (
      <div className="login">
        <h1>Nchat后台管理系统</h1>
        <div className="form-block">
          <Card>
            <Form
              formConfig={this.formConfig}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </div>
      </div>
    )
  }
}


export default CompanyEdit;
