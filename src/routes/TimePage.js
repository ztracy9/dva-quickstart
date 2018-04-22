import React from 'react';
import { connect } from 'dva';
import { Layout,Divider,Row, Col,Card } from 'antd';
import TimePoint from '../components/chooseTime/TimePoint';
import HomeLayout from '../layout/Header/HomeLayout';
import request from '../utils/request';
class TimePage extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie:''
    };
  }
  componentWillMount(){
    let body={mid:this.props.match.params.mid};
    console.log(body);
    request('http://localhost:8080/movie/getById',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          movie:res
        });
      });
  }
  render(){
    const {mid,cid} = this.props.match.params;
    const{movie} = this.state;
    let imgurl="http://localhost:8080"+movie.poster;
    return(
      <HomeLayout>
        <div style={{padding:'30px 50px'}}>
        <Row >
          <Col span="6" style={{background:'black',display:'flex',flexDirection:'column'}} >
            <Card hoverable style={{ width: 262,alignSelf:'center',height:420}}
                  cover={<img alt="example" src={imgurl} style={{width:260,height:345}}/>}>
              <div style={{fontWeight:'bold',lineHeight:'40%'}}>
                <p> 类型：{movie.movieType} </p>
                <p> 时长：{movie.duration} </p>
              </div>
            </Card>
            <div style={{padding:"30px",color:"white"}}>
              <Divider className = "devide" style={{color:"white",textAlign:"center"}}>其他正在热映</Divider>
            </div>
          </Col>
          <Col span="18" style={{background:'white'}}>
            <div style={{padding:'30px', height:'570px'}}>
              <TimePoint mid={mid} cid={cid}/>
            </div>
          </Col>
        </Row>
        </div>
      </HomeLayout>
    );
  }
}
export default TimePage;
