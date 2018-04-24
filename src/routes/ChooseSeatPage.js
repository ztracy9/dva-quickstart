import React from 'react';
import {Layout,Card,Row, Col,Divider,Button,List,message} from 'antd';
import {withRouter} from 'react-router-dom';
import HomeLayout from '../layout/Header/HomeLayout';
import ChooseSeat from '../components/seat/ChooseSeat'
import { connect } from 'dva';
import moment from 'moment';
import seatChosen from "../models/seatChosen";
import request from "../utils/request";

const { Header, Footer, Sider, Content,notification  } = Layout;

class ChooseSeatPage extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      movie_info:'',
      cinema_info: {
        cid: '',
        name: '',
        time: '',
        room: '',
      },
      seatlist: [],//代表选中的座位
      cost:'',
    }
  }
  componentWillMount()
  {
    let body = {
      tid:this.props.match.params.tid
    };
    request('http://localhost:8080/time/getMovieByTimeId',JSON.stringify(body))
    .then((res)=>{
      console.log(res);
      let temp={
        name:res.cinema.name,
        cid:res.cinema.id,
        time:moment(res.startTime).format('HH:mm'),
        room:res.hallNumber
      }
      this.setState({
        movie_info:res.movie,
        cinema_info:temp,
        cost:res.cost
      });
    });
  }
  chooseSeat(r,c){
    const { dispatch } = this.props;
    dispatch({
      type:'seatChosen/chosen',
      payload:{
        row:r,
        col:c
      }
    });
    this.setState({
      seatlist:this.props.seatChosen.list
    });
  }
  //购买
  handleClick(){
    let cnt=this.state.seatlist.length;
    if(cnt==0){
      message.warning('请先选择座位');
      return;
    }
    let body={
      "tid":this.props.match.params.tid,
      "uid":sessionStorage.getItem('userId')||'',
      "cnt":cnt,
      "seat":this.state.seatlist,
      "money":cnt*this.state.cost
    }
    if(body.uid=='')
    {
      message.warning('请先登录');
      return;
    }
    request('http://localhost:8080/order/add',JSON.stringify(body))
      .then((res)=>{
           console.log(res);
           if(res.code==200)
           {
             message.success('购票成功')
             this.props.history.push("/privacy");
           }
           else
           {
              message.error('购票失败，请检查余额是否足够');
           }
      });
  }
  render(){
    let {seatlist,movie_info,cinema_info,cost} = this.state;
    let imgurl="http://localhost:8080"+movie_info.poster;
    let showlist = seatlist.map(item=>
      <div style={{fontSize:15,border:'1px solid #ADD8E6',margin:5,width:100,alignSelf:'center',textAlign:'center'}}>
        {item.row}行{item.col}列
      </div>);

    return(
      <HomeLayout>
        <div style={{padding:'30px 50px'}}>
            <Row style={{minheight:2000}}  gutter={16}>
              <Col span={18}>
                <div style={{margin:'0px 0px 0px 70px'}}>
                  <img style={{height:200,width:'70%',flexAlign:'centre'}} src={require('../assets/screen.png')}/>
                  <ChooseSeat onChoose={this.chooseSeat.bind(this)} tid={this.props.match.params.tid}/>
                </div>
              </Col>

              <Col span={6} style={{background:'white',border:'black',display:'flex',flexDirection:'column'}}>
                <div style={{width:'100%',height:'15%',backgroundColor:'#ADD8E6',fontSize:20,fontWeight:'bold',textAlign:'center'}}>
                  票务信息
                </div>
                <div style={{padding:'25px 0px 10px 0px'}}>
                  <Row>
                    <Col span={8}>
                      <img src={imgurl} style={{height:110,width:80}}/>
                    </Col>
                    <Col span={14}>
                      <div style={{fontWeight:'bold',fontSize:15}}>
                        《{movie_info.name}》<br/>
                      </div>
                      {movie_info.movieType}<br/>
                      {movie_info.duration}分钟
                    </Col>
                  </Row>
                </div>
                <Divider/>
                <div style={{fontSize:17,fontWeight:'bold',lineHeight:'100%',padding:10}}>
                  <Row>
                    <Col span={5}>影院：</Col>
                    <Col span={19}>{cinema_info.name}</Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col span={5}>场次：</Col>
                    <Col span={19}>{cinema_info.time}  {cinema_info.room}号厅</Col>
                  </Row>
                  <br/>
                    <Row gutter={16}>
                      <Col span={6}>座位:</Col>
                      <Col span={18}>{showlist}</Col>
                    </Row>
                    <br/>

                  <p>总计：{this.state.seatlist.length*cost}元</p>
                </div>

                <div style={{alignSelf:'center',padding:'0px 0px 30px 0px'}}>
                <Button type="primary" onClick={this.handleClick.bind(this)}>购买</Button>
                </div>

              </Col>
            </Row>
        </div>
      </HomeLayout>
    );
  }
}

export default connect(({seatChosen}) => ({
  seatChosen,
}))(ChooseSeatPage);
