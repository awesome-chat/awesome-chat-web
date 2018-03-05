import React, { Component } from 'react';
import { Input, Breadcrumb, Select, message, Spin, Icon } from 'antd';
import Form from 'ant-form'
import api from '@client/utils/api'

class DepAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dep: {},
      deps: [],
      users: [],
      loading: true,
    };
    this.depId = props.match.params.depId;
    this.isEdit = props.location.pathname.indexOf('edit') > -1
  }

  componentDidMount() {
    this.fetchUserList()
    this.fetchDepList()
    this.isEdit && this.fetchDep()
  }

  fetchDep = () => {
    api.getDepDetail({
      depId: this.depId
    }).then(({ data }) => {
      this.setState({
        dep: data.data,
      })
    })
  }

  fetchUserList = () => {
    api.getUserList().then(({ data }) => {
      this.setState({
        users: data.data,
      })
    })
  }

  fetchDepList = () => {
    api.getDepList().then(({ data }) => {
      this.setState({
        deps: data.data,
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
    if (this.isEdit) {
      api.updateDep({
        ...values,
        depId: this.depId
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
      api.addDep({
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

  freshForm = () => {
    const { dep, deps, users } = this.state;
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
          text: this.isEdit ? '修改' : '新增',
        }],
      },
      items: [{
        opts: {
          initialValue: dep.depName || '',
          rules: [{ required: true, message: '请输入部门名称!', whitespace: true }],
        },
        name: 'depName',
        props: { ...formItemLayout, label: '部门名称' },
        component: <Input />,
      },{
        opts: {
        },
        name: 'depId',
        props: { ...formItemLayout, label: '部门ID' },
        component: <span>{this.depId}</span>,
        disabled: !this.isEdit,
      },{
        opts: {
          initialValue: dep.depOwnerId && String(dep.depOwnerId) || '',
        },
        name: 'depOwnerId',
        props: { ...formItemLayout, label: '部门负责人' },
        component: (
          <Select
            showSearch
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {users.map(d => (
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
          initialValue: dep.depParentId && String(dep.depParentId) || '',
        },
        name: 'depParentId',
        props: { ...formItemLayout, label: '父级部门' },
        component: (
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
      },],
    }
  }

  render() {
    this.freshForm()

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>{this.isEdit ? '修改部门消息' : '新增部门'}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">{this.isEdit ? '修改部门消息' : '新增部门'}</h1>
        <Spin spinning={this.state.loading}>
          <div style={{ color: '#FA3E4B', margin: '10px 100px' }}><Icon type="exclamation-circle" /> 部门负责人字段若负责人未创建请不选</div>
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
