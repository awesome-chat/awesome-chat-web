import React, { Component } from 'react';
import { Form, Input, Select, Button, AutoComplete, DatePicker, Upload, message, Icon } from 'antd';
import './Company.css';

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      imageUrl: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, imageUrl } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 6,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              公司名称
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              公司类型
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请输入公司类型!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              法定代表人
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('法定代表人', {
            rules: [{ required: true, message: '请输入法定代表人!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              公司logo
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('img')(
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl ?
                  <img src={imageUrl} alt="" className="avatar" /> :
                  <Icon type="plus" className="avatar-uploader-trigger" />
              }
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="成立日期"
        >
          {getFieldDecorator('date', {
            rules: [{ type: 'object', required: true, message: '请选择成立日期!' }],
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入联系电话!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '邮箱格式不合法',
            }, {
              required: true, message: '请输入邮箱!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="网站"
        >
          {getFieldDecorator('website', {
            rules: [{ required: true, message: '请输入该网站!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedCompany = Form.create()(Company);

export default WrappedCompany;
