import React from 'react';
import {Row,Col,Icon,Button,Input,Rate} from 'antd';
import styles from "./CommentContent.css";
const { TextArea } = Input;

class CommentContent extends React.Component {
	constructor(props){
    super(props);
  }
  handleClick = () =>{
		this.props.hideModal();
	}
	render(){
		return(
			<div>
				<p>打个分吧~<Rate allowhalf/></p>
				<TextArea rows={4} placeholder="请在此处输入评价..."/>
				<div className={styles.line}>
					<div className={styles.setButton}>
						<Button onClick={this.handleClick}>提交</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default CommentContent;