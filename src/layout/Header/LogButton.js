import React from 'react';
import {Modal}from 'antd';
import LogContent from './LogContent';

class LogButton extends React.Component{
	state={visible:false}
	showModal = () => {
		this.setState({
			visible:true,
		});
	}
	hideModal = () =>{
		this.setState({
			visible:false,
		});
	}
	render(){
		return(
			<div>
				<div onClick={this.showModal}>登录</div>
				<Modal title="登录" visible={this.state.visible}  onCancel={this.hideModal}  width="350px" footer={null} destroyOnClose={true}>
					<LogContent hideModal={this.hideModal} getStatus={this.props.getStatus}/>
				</Modal>
			</div>
		);
	}
}

export default LogButton;