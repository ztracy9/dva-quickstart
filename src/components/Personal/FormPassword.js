import React from 'react';
import PropTypes from "prop-types";
import request from '../../utils/request';
import {withRouter} from "react-router-dom";
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete,message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class FormPassword extends React.Component{
state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);        
        let Logbody={
          email:this.props.mail,
          password:form.getFieldValue('pw')
        }
        console.log('验证');
        console.log(Logbody);
        request('http://localhost:8080/user/login',JSON.stringify(Logbody))//调用登录api验证密码是否正确
        .then((data)=>{
          console.log('data');
          console.log(data);
          if(!data){
            message.error('原始密码不正确！');
          }else{
            let a=sessionStorage.getItem('userId');
            let Getbody={
             uid:a
            }
            let UpBody;
            request('http://localhost:8080/user/getById',JSON.stringify(Getbody))//根据用户Id获取用户全部信息
            .then((data)=>{
              if(data){            
                data.password=form.getFieldValue('password');
                UpBody=data;
                request('http://localhost:8080/user/update',JSON.stringify(UpBody))//更新用户信息
                .then((data)=>{
                  if(data){
                    message.success('修改密码成功!'); 
                    this.props.getPW(form.getFieldValue('password'));
                    sessionStorage.removeItem('access_token');
                    this.props.history.push("/");
                    message.info('请重新登录');
                  }
               });        
              }
            });
          }
        });        
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 6,
          offset: 0,
        },
        sm: {
          span: 6,
          offset: 8,
        },
      },
    };
	return (
      <Form onSubmit={this.handleSubmit} style={{padding:'60px'}} hideRequiredMark={true}>
        <FormItem
          {...formItemLayout}
          label="请输入原始密码"
        >
          {getFieldDecorator('pw', {
            
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请输入新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,min:8, message: '请输入密码（至少8位）！',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请确认新密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码！',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
	}
}
FormPassword.contextTypes = {
  router:PropTypes.object.isRequired
};
FormPassword = Form.create()(FormPassword);
export default withRouter(FormPassword);