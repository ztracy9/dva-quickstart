import React from 'react';
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {withRouter} from "react-router-dom";
import styles from './LogContent.css';
const FormItem = Form.Item;

class LogContent extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
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
            initialValue: true,
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