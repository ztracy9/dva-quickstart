import React from 'react';
import {Modal,Button}from 'antd';
import BindContent from './BindContent';

class ChangeAccount extends React.Component{
	state={visible:false,Sname:"更改"+this.props.name}
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
				<Button onClick={this.showModal}>更改</Button>
				<Modal title={this.state.Sname} visible={this.state.visible} onCancel={this.hideModal} width="350px" destroyOnClose={true} footer={null}>
					<BindContent mail={this.props.mail} getTele={this.props.getTele} hideModal={this.hideModal}/>
				</Modal>
			</div>
		);
	}
}
export default ChangeAccount;