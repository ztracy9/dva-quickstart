import React from 'react';
import { Layout, Menu,Icon} from 'antd';
import HomeLayout from '../layout/Header/HomeLayout';
import ManageSelect from '../components/Manage/ManageSelect';
import styles from './Privacy.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content,Sider} = Layout;

class Management extends React.Component {
	constructor(props){
    super(props);
    this.state={
    	mid:1
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      mid: e.key,
    });
  }
	render(){
		return(
			<HomeLayout>
				<Layout>
					<Sider width={240} style={{background:'#fff'}} className={styles.sider}>
						<div className={styles.setPos}>
							<img alt=" " src={require('../assets/4.jpg')} className={styles.setCircle}/>
						</div>
						<Menu onClick={this.handleClick} mode="inline" style={{height: '100%', borderRight: 0}}>
							<Menu.Item key="1"><Icon type="user" className={styles.list}/>用户管理</Menu.Item>
							<Menu.Item key="2"><Icon type="picture" className={styles.list}/>影片管理</Menu.Item>
							<Menu.Item key="3" ><Icon type="switcher"  className={styles.list}/>影院管理</Menu.Item>
						</Menu>
					</Sider>
					<Layout style={{padding: '40px'}}>
						<Content style={{background: '#fff', padding:24, margin:0, minHeight:480}}>
						<ManageSelect mid={this.state.mid}/>
						</Content>
					</Layout>
				</Layout>
			</HomeLayout>
		);
	}
}

Management.propTypes = {
};

export default Management;
