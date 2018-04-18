import React from 'react';
import {Modal}from 'antd';
import ContactContent from './ContactContent';

class Contact extends React.Component{
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
				<div onClick={this.showModal}>联系我们</div>
				<Modal title="帮助" visible={this.state.visible}  onCancel={this.hideModal}  width="600px" footer={null}>
					<ContactContent hideModal={this.hideModal}/>
				</Modal>
			</div>
		);
	}
}

export default Contact;