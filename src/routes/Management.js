import React from 'react';
import { Layout, Menu,Icon,Row,Col} from 'antd';
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
        <div style={{padding:'0px 24px 20px 0px'}}>
          <Row gutter={32}>
            <Col span={5} >
              <div  style={{background:'#fff',minHeight:890,paddingTop:40}}>
              <div className={styles.setPos}>
                <img alt=" " src={require('../assets/4.jpg')} className={styles.setCircle}/>
              </div>
              <Menu onClick={this.handleClick} mode="inline" style={{height: '100%', borderRight: 0}}>
                <Menu.Item key="1"><Icon type="user" className={styles.list}/>用户管理</Menu.Item>
                <Menu.Item key="2"><Icon type="picture" className={styles.list}/>影片管理</Menu.Item>
                <Menu.Item key="3" ><Icon type="switcher"  className={styles.list}/>影院管理</Menu.Item>
              </Menu>
              </div>
            </Col>
            <Col span={19}>
              <div  style={{background: '#fff', padding:24, marginTop:20, minHeight:870}}>
                <ManageSelect mid={this.state.mid}/>
              </div>
            </Col>
          </Row>
        </div>
			</HomeLayout>
		);
	}
}

Management.propTypes = {
};

export default Management;
