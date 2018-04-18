import React from 'react';
import LogHeader from './LogHeader.js';
import PriHeader from './PriHeader';
import styles from './HomeLayout.css';
import {Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class HomeLayout extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	isLog:true
    };
  }
	render(){
		const { children} = this.props;
		if(this.state.isLog){
			return <Layout>
				<LogHeader/>
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
	}
}
export default HomeLayout;
