import React from 'react';
import { connect } from 'dva';
import { Layout,Divider,Row, Col,Card } from 'antd';
import TimePoint from '../components/TimePoint';
import HomeLayout from '../layout/HomeLayout';

class TimePage extends React.Component{
  render(){
    const {mid,cid} = this.props.match.params;
    return(
      <HomeLayout>
        <Row >
          <Col span="6" style={{background:'black',display:'flex',flexDirection:'column'}} >
            <Card hoverable style={{ width:'80%',height:'30%',alignSelf:'center' }} cover={<img alt="example" src={require('../assets/m1.jpg')} />}>
              类型：奇幻/剧情/冒险<br/>
              时长：129分钟
            </Card>
            <div style={{padding:"30px",color:"white"}}>
              <Divider className = "devide" style={{color:"white",textAlign:"center"}}>其他正在热映</Divider>
            </div>
          </Col>
          <Col span="18" style={{background:'white'}}>
            <div style={{padding:'30px'}}>
              <TimePoint mid={mid} cid={cid}/>
            </div>
          </Col>
        </Row>
      </HomeLayout>
    );
  }
}
export default TimePage;
