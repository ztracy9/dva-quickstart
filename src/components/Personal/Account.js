import React from 'react';
import { Collapse,Icon} from 'antd';
import styles from './Account.css';

const Panel = Collapse.Panel;

class Account extends React.Component{
	constructor(props){
    super(props);
    	this.state={
    		fremoney:'0.00'
    	}
  	}
	render(){
		return(
			<Collapse bordered={false} defaultActiveKey={['1']}>
	 			<Panel header={<div><Icon type="pay-circle-o" />账户金额</div>} key="1">
	 				<p style={{paddingLeft:'24px'}}>
	 					<div>可用余额：{this.props.money}</div>
	 					<div>冻结金额：{this.state.fremoney}</div>
	 				</p>
	 			</Panel>
	 			<Panel header={<div><Icon type="profile" />历史账单</div>} key="3">
	 				<p>
	 					<div className={styles.setpos}>
	 						<div><Icon type="pay-circle" />《前任3：再见前任》上海地中海影城电影票</div>
	 						<div>-60.60</div>
	 					</div>
	 				</p>
	 				<p>
	 					<div className={styles.setpos}>
	 						<div><Icon type="red-envelope" /> 打开好友分享的红包：</div>
	 						<div>+0.02</div>
	 					</div>
	 				</p>
	 			</Panel>
	 			<Panel header={<div><Icon type="red-envelope" />代金券</div>} key="4">
	 				<p>
	 					<div className={styles.setpos}>
	 						<div><Icon type="gift" />地中海影城（满25可用）</div>
	 						<div>￥2</div>
	 					</div>
	 				</p>
	 				<p>
	 					<div className={styles.setpos}>
	 						<div><Icon type="gift" />太平洋影城（满66可用）</div>
	 						<div>￥10</div>
	 					</div>
	 				</p>
	 			</Panel>
	 			<Panel header={<div><Icon type="credit-card" />影城卡</div>} key="5">
	 				<p style={{paddingLeft:'24px'}}>有效期至2018年7月2日</p>
	 			</Panel>
	 		</Collapse>
		);
	}
}
export default Account;