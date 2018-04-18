import React from 'react';
import { Divider,Row, Col,Card } from 'antd';
import CinemaList from '../components/chooseCinema/CinemaList';
import HomeLayout from '../layout/Header/HomeLayout';
import request from '../utils/request';
const { Meta } = Card;
class CinemaPage extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie:''
    };
  }
  componentWillMount(){
    let body = {mid:this.props.match.params.mid};
    request('http://localhost:8080/movie/getById',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          movie:res
        });
      });
  }
  render(){
    const{movie}= this.state;
    return (
     <HomeLayout>
         <div style={{padding:'30px 50px'}}>
          <Row >
            <Col span="6" style={{background:'black',display:'flex',flexDirection:'column',height:'600px'}} >
              <Card hoverable style={{ width: 262,alignSelf:'center',height:420}}
                    cover={<img alt="example" src={movie.poster} style={{width:260,height:345}}/>}>
                <div style={{fontWeight:'bold',lineHeight:'40%'}}>
                <p> 类型：{movie.movieType} </p>
                <p> 时长：{movie.duration} </p>
                </div>
              </Card>
              <div style={{padding:"40px",color:"white"}}>
                <Divider className = "devide" style={{color:"white",textAlign:"center"}}>其他正在热映</Divider>
              </div>
            </Col>
            <Col span="18" style={{background:'white',height:'600px'}}>
              <CinemaList movie={this.state.movie}/>
            </Col>
          </Row>
         </div>
     </HomeLayout>
    );
  }
}

export default CinemaPage;
