import React from 'react';
import LogHeader from './LogHeader';
import PriHeader from './PriHeader';
import AdminHeader from './AdminHeader';
import styles from './HomeLayout.css';
import {Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class HomeLayout extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	isLog:false,
      isAdmin:false
    };
  }
  getStatus=(e,val)=>{
    this.setState({
      isLog:e,
      isAdmin:val
    });
  }
  componentWillMount(){
    let a = sessionStorage.getItem('access_token');
    let b = sessionStorage.getItem('isAdmin');
    this.setState({
      isLog:a,
      isAdmin:b
    });
  }
	render(){
		const { children} = this.props;
		if(this.state.isLog){
      if(this.state.isAdmin==="true"){
        return <Layout>
        <AdminHeader/>
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Mlife cinema System 2016 Created by Ant UED
        </Footer>
        </Layout>;
      }else{
        return <Layout>
        <PriHeader/>
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Mlife cinema System 2016 Created by Ant UED
        </Footer>
      </Layout>;
      }     	
		}else{
      return <Layout>
        <LogHeader getStatus={this.getStatus}/>
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Mlife cinema System 2016 Created by Ant UED
        </Footer>
        </Layout>;      
		}
	}
}
export default HomeLayout;