import React, { Component } from 'react';
import { Input, Breadcrumb, Select, Spin, message, Icon } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
      deps: [],
    };
    this.userId = props.match.params.userId;
    this.isEdit = props.location.pathname.indexOf('edit') > -1
  }

  componentDidMount() {
    this.fetchDep()
    this.isEdit && this.fetchUserDetail()
  }

  fetchUserDetail = () => {
    api.getUserDetail({
      userId: this.userId
    }).then(({ data }) => {
      this.setState({
        user: data.data,
      })
    })
  }

  fetchDep = () => {
    api.getDepList().then(({ data }) => {
      this.setState({
        deps: data.data,
        loading: false,
      })
    })
  }

  freshFormConfig = () => {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 }
    }

    const { deps, user } = this.state

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
          text: this.isEdit ? '修改' : '新增',
        }],
      },
      items: [{
        opts: {
          initialValue: user.userName || '',
          rules: [{ required: true, message: '请输入员工姓名!', whitespace: true }],
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
        component: <span>{this.userId}</span>,
        disabled: !this.isEdit,
      },{
        opts: {
          initialValue: user.userTel || '',
          rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
        },
        name: 'userTel',
        props: { ...formItemLayout, label: '联系电话' },
        component: <Input />,
      },{
        opts: {
          initialValue: user.dep && String(user.dep.depId) || '',
          rules: [{ required: true, message: '请选择所属部门!'}],
        },
        name: 'depId',
        props: { ...formItemLayout, label: '所属部门' },
        component:  (
          <Select
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {deps.map(d => (
              <Select.Option
                key={String(d.depId)}
                value={String(d.depId)}
              >
                {d.depName}
              </Select.Option>
            ))}
          </Select>
        ),
      }],
    }
  }

  handleSubmit = (err, values) => {
    if (err) {
      return
    }
    this.setState({
      loading: true,
    })
    if (this.isEdit) {
      api.updateUser({
        ...values,
        userId: this.userId,
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
    } else {
      api.addUser({
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
  }

  render() {
    this.freshFormConfig()
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>{this.isEdit ? '员工信息修改' : '新增员工'}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">{this.isEdit ? '员工信息修改' : '新增员工'}</h1>
        {this.isEdit ? null : <div style={{ color: '#FA3E4B', margin: '10px 100px' }}><Icon type="exclamation-circle" /> 请先新增部门后新增员工</div>}
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


export default UserEdit;
