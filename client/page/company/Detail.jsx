import React, { Component } from 'react';
import { Breadcrumb, Card } from 'antd'
import CompanyDetailPageCreate from 'detail-page-create'
import './company.css'

class CompanyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: 'wry',
        owner: '12asdvhbadsjvbhjkasdvkjahsdvkajsdkjsda3',
        tel: '111111',
        mail: '11@11.com',
      },
    }
    this.commonLayout = {
      labelCol: 2,
      contentCol: 2,
    }
    this.dataStrcut = [
      {
        name: 'name',
        label: '公司名:',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'owner',
        label: '法定代表人:',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'tel',
        label: '电话:',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'mail',
        label: '邮箱:',
        layout: {
          ...this.commonLayout
        },
      },
    ]
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>公司详情</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="page-title">公司详情</h1>
        <Card>
          <CompanyDetailPageCreate
            rowStyle={{ background: '#f8f8f8', paddingTop: '5px' }}
            style={{ margin: '10px' }}
            dataStrcut={this.dataStrcut}
            data={this.state.data}
          />
        </Card>
      </div>
    );
  }
}

export default CompanyDetail;
