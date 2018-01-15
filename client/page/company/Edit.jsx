import React, { Component } from 'react';
import { Input, Breadcrumb, Select, message } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'
import './Company.scss';

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: []
    };
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchData()
  }

  fetchUser = () => {
    api.getUser({
      companyId: 1
    }).then(({ data }) => {
      this.setState({
        user: data,
      })
    })
  }

  fetchData = () => {
    api.getCompanyDetail({
      companyId: 1
    }).then(({ data }) => {
      this.setState({
        data,
      })
    })
  }

  handleSubmit = (err, values) => {
    console.log(err, values)
    if (err) {
      return
    }
    api.updateCompanyDetail({
      companyId: 1,
      ...values
    }).then(({ data }) => {
      if (data) {
        message.success('操作成功')
      } else {
        message.success('操作失败请重试')
      }
    })
  }

  freshForm = () => {
    const { data, user } = this.state;
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
          initialValue: data.companyName || '',
          rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
        },
        name: 'companyName',
        props: { ...formItemLayout, label: '公司名' },
        component: <Input />,
      },{
        opts: {
          initialValue: data.user && String(data.user.userId) || '',
          rules: [{ required: true, message: '请输入法定代表人!' }],
        },
        name: 'companyOwnerId',
        props: { ...formItemLayout, label: '法定代表人' },
        component: (
          <Select
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {user.map(d => (
              <Select.Option
                key={String(d.userId)}
                value={String(d.userId)}
              >
                {`${d.userName}-${d.userId}`}
              </Select.Option>
            ))}
          </Select>
        ),
      },{
        opts: {
          initialValue: data.companyTel || '',
          rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
        },
        name: 'companyTel',
        props: { ...formItemLayout, label: '联系电话' },
        component: <Input />,
      },{
        opts: {
          initialValue: data.companyMail || '',
          rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
        },
        name: 'companyMail',
        props: { ...formItemLayout, label: '联系电话' },
        component: <Input />,
      },],
    }
  }

  render() {
    this.freshForm()

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>信息修改</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">信息修改</h1>
        <Form
          formConfig={this.formConfig}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}


export default CompanyEdit;
