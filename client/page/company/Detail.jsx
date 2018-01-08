import React, { Component } from 'react';
import { Form, Input, Select, Button, AutoComplete, DatePicker, Upload, message, Icon } from 'antd'
import DetailPageCreate from 'detail-page-create'
import './company.css'

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: 'wry',
        id: '12asdvhbadsjvbhjkasdvkjahsdvkajsdkjsda3',
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
        label: '姓名：',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'id',
        label: 'ID：',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'tel',
        label: '电话：',
        layout: {
          ...this.commonLayout
        },
      },
      {
        name: 'mail',
        label: '邮箱：',
        layout: {
          ...this.commonLayout
        },
      },
    ]
  }

  render() {
    return (
      <div>
        <DetailPageCreate
          style={{ margin: '20px' }}
          dataStrcut={this.dataStrcut}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default Detail;
