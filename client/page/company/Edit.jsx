import React, { Component } from 'react';
import { Input, Select, Button, AutoComplete, DatePicker, Upload, message, Icon } from 'antd';
import Form from 'ant-form'
import './company.css';

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Company extends Component {
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
        <Form
          formConfig={this.formConfig}
          onSubmit={(err, values) => { console.log(err || values) }}
        />
      </div>
    )

    // return (
    //   <Form onSubmit={this.handleSubmit}>
    //     <FormItem
    //       {...formItemLayout}
    //       label={(
    //         <span>
    //           公司名称
    //         </span>
    //       )}
    //       hasFeedback
    //     >
    //       {getFieldDecorator('name', {
    //         rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
    //       })(
    //         <Input />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label={(
    //         <span>
    //           公司类型
    //         </span>
    //       )}
    //       hasFeedback
    //     >
    //       {getFieldDecorator('type', {
    //         rules: [{ required: true, message: '请输入公司类型!', whitespace: true }],
    //       })(
    //         <Input />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label={(
    //         <span>
    //           法定代表人
    //         </span>
    //       )}
    //       hasFeedback
    //     >
    //       {getFieldDecorator('法定代表人', {
    //         rules: [{ required: true, message: '请输入法定代表人!', whitespace: true }],
    //       })(
    //         <Input />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label={(
    //         <span>
    //           公司logo
    //         </span>
    //       )}
    //       hasFeedback
    //     >
    //       {getFieldDecorator('img')(
    //         <Upload
    //           className="avatar-uploader"
    //           name="avatar"
    //           showUploadList={false}
    //           action="//jsonplaceholder.typicode.com/posts/"
    //           beforeUpload={this.beforeUpload}
    //           onChange={this.handleChange}
    //         >
    //           {
    //             imageUrl ?
    //               <img src={imageUrl} alt="" className="avatar" /> :
    //               <Icon type="plus" className="avatar-uploader-trigger" />
    //           }
    //         </Upload>
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label="成立日期"
    //     >
    //       {getFieldDecorator('date', {
    //         rules: [{ type: 'object', required: true, message: '请选择成立日期!' }],
    //       })(
    //         <DatePicker />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label="联系电话"
    //     >
    //       {getFieldDecorator('phone', {
    //         rules: [{ required: true, message: '请输入联系电话!' }],
    //       })(
    //         <Input style={{ width: '100%' }} />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label="联系电话"
    //       hasFeedback
    //     >
    //       {getFieldDecorator('email', {
    //         rules: [{
    //           type: 'email', message: '邮箱格式不合法',
    //         }, {
    //           required: true, message: '请输入邮箱!',
    //         }],
    //       })(
    //         <Input />
    //       )}
    //     </FormItem>
    //     <FormItem
    //       {...formItemLayout}
    //       label="网站"
    //     >
    //       {getFieldDecorator('website', {
    //         rules: [{ required: true, message: '请输入该网站!' }],
    //       })(
    //         <AutoComplete
    //           dataSource={websiteOptions}
    //           onChange={this.handleWebsiteChange}
    //         >
    //           <Input />
    //         </AutoComplete>
    //       )}
    //     </FormItem>
    //     <FormItem {...tailFormItemLayout}>
    //       <Button type="primary" htmlType="submit">修改</Button>
    //     </FormItem>
    //   </Form>
    // );
  }
}

// const WrappedCompany = Form.create()(Company);

export default Company;
