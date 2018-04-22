 import React from 'react';
import PropTypes from "prop-types";
import request from '../../utils/request';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class BindContent extends React.Component{
	state = {
    	confirmDirty: false,
    	autoCompleteResult: [],
  	};
  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);        
        let Logbody={
          email:this.props.mail,
          password:form.getFieldValue('password')
        }
        request('http://localhost:8080/user/login',JSON.stringify(Logbody))//调用登录api验证密码是否正确
        .then((data)=>{
          if(!data){
            message.error('密码不正确！');
          }else{
            let a=sessionStorage.getItem('userId');
            let Getbody={
             uid:a
            }
            let UpBody;
            request('http://localhost:8080/user/getById',JSON.stringify(Getbody))//根据用户Id获取用户全部信息
            .then((data)=>{
              if(data){            
                console.log(data);
                data.tel=form.getFieldValue('phone');
                UpBody=data;
                console.log('UpBody');
                console.log(UpBody);
                request('http://localhost:8080/user/update',JSON.stringify(UpBody))//更新用户信息
                .then((data)=>{
                  if(data){
                    message.success('更改成功!'); 
                    this.props.getTele(form.getFieldValue('phone'));
                    this.props.hideModal();
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
	render(){
		const { getFieldDecorator } = this.props.form;
    	const { autoCompleteResult } = this.state;
    	const formItemLayout = {
      		labelCol: {
       		 xs: { span: 12 },
       		 sm: { span: 6 },
      		},
      		wrapperCol: {
       		 xs: { span: 24},
       		 sm: { span: 16 },
      		},
    		};
    		const tailFormItemLayout = {
      			wrapperCol: {
        			xs: {
          				span: 24,
          				offset: 0,
        			},
        			sm: {
          				span: 16,
          				offset: 8,
        			},
      			},
    		};
		return(
			<Form onSubmit={this.handleSubmit}>
				<FormItem
          			{...formItemLayout}
          			label="手机"
        		>
          			{getFieldDecorator('phone', {
            		rules: [{ required: true,len:11, message: '请输入你的手机号（11位数字）！' }],
          		})(
            	<Input style={{ width: '100%' }} />
          		)}
        		</FormItem>
        		<FormItem
          			{...formItemLayout}
          			label="密码"
        		>
          		{getFieldDecorator('password', {
            	rules: [{
              	required: true, message: '请输入你的密码！',
            	}],
          		})(
            	<Input type="password" />
          		)}
        		</FormItem>
        		<FormItem {...tailFormItemLayout}>
          			<Button type="primary" htmlType="submit">确定</Button>
        		</FormItem>
        	</Form>
		);
	}
}
BindContent.contextTypes = {
  router:PropTypes.object.isRequired
};
BindContent = Form.create()(BindContent);
export default BindContent;