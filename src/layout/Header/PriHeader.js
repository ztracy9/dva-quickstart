import React from 'react';
import { Menu, Icon ,Layout,Row,Col,Modal} from 'antd';
import Contact from './Contact';
import {withRouter} from "react-router-dom";
import styles from './HomeLayout.css'; 
const { Header, Content,Sider} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PriHeader extends React.Component{
	handleClick = (e) => {
    console.log('click ', e);
    if(e.key==="1"){
    	this.props.history.push("/");
    }else if(e.key==="2"){
    	this.props.history.push("/movie");
    }else if(e.key==="3"){
    	this.props.history.push("/privacy");
    }else if(e.key==="5"){
    	sessionStorage.removeItem('access_token');
    }
  }
	render(){
		return(
			<Header className="header" style={{background:'black',height:'64px'}}>
				<Row>
					<Col span={2}></Col>
					<Col span={9}>
						<Menu mode="horizontal" style={{ lineHeight: '64px',height:'65px',background:'black',color:'white'}} onClick={this.handleClick}>					
							<Menu.Item className={styles.font} key="1">首页</Menu.Item>
							<Menu.Item className={styles.font} key="2">电影</Menu.Item>
						</Menu>
						</Col>
						<Col span={6}><div style={{color:'white'}} className={styles.brand}>Mlife</div></Col>
						<Col span={6}>
						<Menu mode="horizontal" style={{ lineHeight: '64px',height:'65px',background:'black',color:'white'}} onClick={this.handleClick}>
							<Menu.Item className={styles.font} key="3">个人中心</Menu.Item>
							<Menu.Item className={styles.font} key="4">
								<Contact/>
							</Menu.Item>
							<Menu.Item className={styles.font} key="5">退出登录</Menu.Item>
						</Menu>
					</Col>
				</Row>				
			</Header>
		);
	}
}
export default withRouter(PriHeader);