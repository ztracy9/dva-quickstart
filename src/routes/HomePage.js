import React from 'react';
import {withRouter} from "react-router-dom";
import { Button,Row,Col } from 'antd';
import HomeLayout from '../layout/Header/HomeLayout';
import Pic from '../assets/timg.jpg';
import styles from './HomePage.css';

var bg={
  borderTop: 'solid 1px #F2F2F2',
  height:'570px',
  width:'100%',
  backgroundImage:`url(${Pic})`,
  backgroundPosition:'70px',
}
class HomePage extends React.Component {
	handleClick=()=>{
		this.props.history.push("/register");
	}
	render(){
		return(
			<HomeLayout>
				<div style={bg}>
          <div style={{width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.2)'}}>
					<div style={{paddingTop:'130px' ,paddingLeft:' 760px'}}>

						<div className={styles.font}>The movie meet Life</div>
						<div style={{fontSize:'35px',paddingLeft:'60px',color:'white'}}>电影，遇见生活</div>
						<p></p>
						<div style={{paddingLeft:'100px',color:'white'}}>
							<a style={{color:'white'}} onClick={this.handleClick}>
								<div style={{width:'150px',height:'50px',borderStyle:'solid',boderWidth:'10px'}}>
									<span style={{height:'50px',lineHeight:'50px',display:'block',color:'white',textAlign:'center',fontSize:'18px'}}>创建新账户</span>
								</div>
							</a>
						</div>
            </div>
					</div>

        </div>
			</HomeLayout>
		);
	}
}

HomePage.propTypes = {
};

export default withRouter(HomePage);
