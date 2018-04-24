import React from 'react';
import PropTypes from "prop-types";
import request from '../../utils/request';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import {withRouter} from "react-router-dom";
import styles from './LogContent.css';
const FormItem = Form.Item;

class LogContent extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let body={
          email:form.getFieldValue('userName'),
          password:form.getFieldValue('password')
        }
        console.log(body);
        request('http://localhost:8080/user/login',JSON.stringify(body))
        .then((data)=>{
          let a = sessionStorage.getItem('access_token');
          if(a){
            console.log('登录');
            console.log(data);
            message.success('登录成功!');            
            if(data.isAdmin)
              this.props.getStatus(true,"true");
            else
              this.props.getStatus(true,"false");
            this.props.hideModal();
          }else{
            message.error('账号或密码不正确！');
          }
        });
      }
    });
  }
  gotoLink = () => {
    this.props.history.push("/register");    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入邮箱！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className={styles.loginFormforgot} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={styles.loginFormbutton}>
            登录
          </Button>
          <a href="javascript:void(0)"  onClick={this.gotoLink}>现在注册！</a>
        </FormItem>
      </Form>
    );
  }
}
LogContent.contextTypes = {
  router:PropTypes.object.isRequired
};
LogContent=Form.create()(LogContent);
export default withRouter(LogContent);