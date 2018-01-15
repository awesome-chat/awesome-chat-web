import React, { Component } from 'react';
import { Input, Breadcrumb, Select, message, Spin } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'

class DepAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dep: [],
      user: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchDep()
  }

  fetchUser = () => {
    api.getUserList().then(({ data }) => {
      this.setState({
        user: data,
      })
    })
  }

  fetchDep = () => {
    api.getDepList().then(({ data }) => {
      this.setState({
        dep: data,
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
    api.addDep().then(({ data }) => {
      if (data) {
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
    const { dep, user } = this.state;
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
          rules: [{ required: true, message: '请输入部门名称!', whitespace: true }],
        },
        name: 'depName',
        props: { ...formItemLayout, label: '部门名称' },
        component: <Input />,
      },{
        opts: {
        },
        name: 'depOwnerId',
        props: { ...formItemLayout, label: '部门负责人' },
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
        },
        name: 'depParentId',
        props: { ...formItemLayout, label: '父级部门' },
        component: (
          <Select
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {dep.map(d => (
              <Select.Option
                key={String(d.depId)}
                value={String(d.depId)}
              >
                {d.depName}
              </Select.Option>
            ))}
          </Select>
        ),
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
        <h1 className="page-title">新增部门</h1>
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


export default DepAdd;
