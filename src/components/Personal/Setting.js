import React from 'react';
import {Button,message} from 'antd';
import UploadAvatar from './UploadAvatar.js';
import styles from './Setting.css';

class Setting extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	Aurl:"http://localhost:8080"+this.props.url,
    	url:this.props.url,//头像链接
    	text:this.props.text,
    	record:''
    }
    console.log(this.state.Aurl);
  }
	handleVal=(val)=>{
		if(this.state.url!==val){
			this.setState({
				Aurl:"http://localhost:8080"+val,
				url:val
			});		
		}
	}
	textChange=(event)=>{
		this.setState({
			record:event.target.value
		});
	}
	handleClick=()=>{
		if(this.state.record)
			this.state.text=this.state.record;
		this.props.handleChange(this.state.url,this.state.text);
	}
	render(){
		return(
			<div className={styles.setPos}>
				<div className={styles.setAvatar}>
					<img alt=" " src={this.state.Aurl} className={styles.setCircle}/>
					<span className={styles.change}><UploadAvatar handleVal={this.handleVal}/></span>
				</div>
				<div className={styles.setInput}>
					<span>昵称：</span>
					<input defaultValue={this.state.text} onChange={this.textChange} style={{width:350}}/>
				</div>
				<div className={styles.setButton}>
					<Button type="primary" onClick={this.handleClick} style={{width:100}}>保存</Button>
				</div>
			</div>
				
		);
	}
}
export default Setting;