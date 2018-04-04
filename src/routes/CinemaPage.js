import React from 'react';
import { Divider,Row, Col,Card } from 'antd';
import CinemaList from '../components/CinemaList';
import HomeLayout from '../layout/HomeLayout';

const { Meta } = Card;
class CinemaPage extends React.Component{
  render(){
    return (
     <HomeLayout>

          <Row >
            <Col span="6" style={{background:'black',display:'flex',flexDirection:'column'}} >
              <Card hoverable style={{ width: 240,alignSelf:'center' }} cover={<img alt="example" src={require('../assets/m1.jpg')} />}>
                类型：奇幻/剧情/冒险<br/>
                时长：129分钟
              </Card>
              <div style={{padding:"40px",color:"white"}}>
                <Divider className = "devide" style={{color:"white",textAlign:"center"}}>其他正在热映</Divider>
              </div>
            </Col>
            <Col span="18" style={{background:'white'}}>
              <CinemaList mid={this.props.match.params.mid}/>
            </Col>
          </Row>

     </HomeLayout>
    );
  }
}

export default CinemaPage;
