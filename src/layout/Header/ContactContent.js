import React from 'react';
import {Row,Col,Icon,Button} from 'antd';
import styles from './ContactContent.css';

class ContactContent extends React.Component {
	constructor(props){
    super(props);
  }
  handleClick = () =>{
		this.props.hideModal();
	}
	render(){
		return(
			<div>
				<p style={{fontWeight:'700',fontSize:'15px',textAlign:'center'}}>遇到麻烦了？请联系我们！</p>
				<p style={{textAlign:'center'}}>请在来信中告知我们您遇到的问题，我们将尽快为您答复</p>
				<Row>
					<Col span={9}>
						<Row>
							<Col span={9}>
								<img src={require('../../assets/zyq.jpg')} className={styles.setCircle}/>
							</Col>
							<Col span={15}>
								<div className={styles.font}>朱玉倩</div>
								<div className={styles.font}>YuQian Zhu</div>
								<a href="mailto:151330102@mail.dhu.edu.cn"><Icon type="mail" />Email</a>
							</Col>
						</Row>
					</Col>
					<Col span={8}>
						<Row>
							<Col span={10}>
								<img src={require('../../assets/mzx.jpg')} className={styles.setCircle}/>
							</Col>
							<Col span={14}>
								<div className={styles.font}>孟兆昕</div>
								<div className={styles.font}>demerzel</div>
								<a href="mailto:151330109@mail.dhu.edu.cn"><Icon type="mail" />Email</a>
							</Col>
						</Row>
					</Col>
					<Col span={7}>
						<Row>
							<Col span={11}>
								<img src={require('../../assets/lx.jpg')} className={styles.setCircle}/>
							</Col>
							<Col span={13}>
								<div className={styles.font}>刘雪</div>
								<div className={styles.font}>Osmanthus</div>
								<a href="mailto:151340204@mail.dhu.edu.cn"><Icon type="mail" />Email</a>
							</Col>
						</Row>
					</Col>
				</Row>
				<div className={styles.line}>
					<div className={styles.setButton}>
						<Button onClick={this.handleClick}>关闭</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default ContactContent;