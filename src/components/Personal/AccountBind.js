import React from 'react';
import ChangeAccount from './ChangeAccount';
import {List,Icon,Button} from 'antd';

class AccountBind extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	name:'手机'
    }
  }
	render(){
		return(
			<div style={{padding:'50px'}}>
			<p>当前登录账号：{this.props.mail}</p>
			<p>已绑定邮箱、手机等2项</p>
			<List bordered size="large">
				<List.Item actions={[<Button>更改</Button>]}>
					<div>
						<Icon type="mail" />邮箱：{this.props.mail}
					</div>
				</List.Item>
				<List.Item actions={[<ChangeAccount mail={this.props.mail} telenumber={this.props.telenumber} getTele={this.props.getTele} name="手机"/>]}>
					<div>
						<Icon type="mobile" />手机：{this.props.telenumber}
					</div>
				</List.Item>
			</List>
			</div>
		);
	}

}
export default AccountBind;