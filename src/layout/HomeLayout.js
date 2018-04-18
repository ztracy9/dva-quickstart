import React from 'react';
import {Layout,Menu} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class HomeLayout extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render () {
    const { children} = this.props;

    return (
      <Layout>
        <div style={{backgroundColor:'white'}}>
        <Menu className='menu' onClick={this.handleClick} selectedKeys={[this.state.current]}
          theme="light"
          mode='horizontal'
          style={{padding:'10px 30px 10px 50px', backgroundColor:'rgba(0,0,0,0.8)',color:'white',fontFamily:'幼圆',fontWeight:'bold',fontSize:15 }}
        >
          <Menu.Item key="mail" >
            首页
          </Menu.Item>
          <Menu.Item key="app">
            电影购票
          </Menu.Item>

          <Menu.Item key="alipay">
            管理
          </Menu.Item>
        </Menu>
        </div>
        <Content  style={{padding:'20px 80px'}}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          XX cinema System ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default HomeLayout;
