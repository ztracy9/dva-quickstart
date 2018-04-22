import React from 'react';
import {Modal}from 'antd';
import CommentContent from './CommentContent';

class Comment extends React.Component{
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
				<a href="javascript:void(0)" onClick={this.showModal}>立即评价</a>
				<Modal title="评价" visible={this.state.visible}  onCancel={this.hideModal}  width="400px" footer={null}>
					<CommentContent hideModal={this.hideModal}/>
				</Modal>
			</div>
		);
	}
}

export default Comment;