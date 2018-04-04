import React from 'react';
import {Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
class HomeLayout extends React.Component {
  render () {
    const { children} = this.props;
    return (
      <Layout>
        <Header>header</Header>

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
