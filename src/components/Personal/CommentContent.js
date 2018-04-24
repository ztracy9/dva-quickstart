import React from 'react';
import request from '../../utils/request';
import {withRouter} from "react-router-dom";
import {Row,Col,Icon,Button,Input,Rate,message} from 'antd';
import styles from "./CommentContent.css";
const { TextArea } = Input;

class CommentContent extends React.Component {
	constructor(props){
    	super(props);
    	this.state={
    		rate:0,
    		text:''
    	}
  	}
  	handleClick = () =>{
  		let a=sessionStorage.getItem('userId');
  		let body={
  			userId:a,
  			movieId:this.props.movieId,
  			content:this.state.text,
  			grade:this.state.rate
  		}
  		request('http://localhost:8080/comment/add',JSON.stringify(body))
    	.then((data)=>{
    		console.log('评价');
    		console.log(data);
    		if(data){
    			message.success('评价成功！');
    			this.props.hideModal();
    			let id = this.props.movieId;
    			this.props.history.push("/movieDetail/"+id);
    		}
    		else{
    		  message.warn('已经评价过了哦！');
        }
    	})
	}
	textChange=(event)=>{
		this.setState({
			text:event.target.value
		});
	}
	rateChange=(value)=>{
		this.setState({
			rate:value*2
		})
	}
	render(){
		return(
			<div>
				<p>打个分吧~<Rate allowhalf onChange={this.rateChange}/></p>
				<TextArea rows={4} placeholder="请在此处输入评价..." onChange={this.textChange}/>
				<div className={styles.line}>
					<div className={styles.setButton}>
						<Button onClick={this.handleClick}>提交</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(CommentContent);
