import React, { Component } from 'react';
import { Input, Breadcrumb, Select, message, Spin } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'
import './Company.scss';

class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchData()
  }

  fetchUser = () => {
    api.getUserList().then(({ data }) => {
      this.setState({
        user: data.data,
      })
    })
  }

  fetchData = () => {
    api.getCompanyDetail().then(({ data }) => {
      this.setState({
        data: data.data,
        loading: false,
      })
    })
  }

  handleSubmit = (err, values) => {
    if (err) {
      return
    }
    this.setState({
      loading: true,
    })
    api.updateCompanyDetail({
      ...values
    }).then(({ data }) => {
      if (data.code === 0) {
        message.success('操作成功')
      } else {
        message.success('操作失败请重试')
      }
      this.setState({
        loading: false,
      })
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
        <Spin spinning={this.state.loading}>
          <Form
            formConfig={this.formConfig}
            onSubmit={this.handleSubmit}
          />
        </Spin>
      </div>
    )
  }
}


export default CompanyEdit;
