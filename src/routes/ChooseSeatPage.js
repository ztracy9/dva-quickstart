import React from 'react';
import {Layout,Card,Row, Col,Divider,Button,List} from 'antd';
import HomeLayout from '../layout/HomeLayout';
import ChooseSeat from '../components/seat/ChooseSeat'
import { connect } from 'dva';
import seatChosen from "../models/seatChosen";

const { Header, Footer, Sider, Content } = Layout;

class ChooseSeatPage extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      movie_info: {
        title: '哈利波特与魔法石',
        type: '剧情/奇幻'
      },
      cinema_info: {
        cid: 1,
        name: '地中海影城',
        time: '15:30',
        room: 7
      },
      seatlist: []
    }
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

  render(){
    let {seatlist} = this.state;
    let showlist = seatlist.map(item=>
      <div style={{fontSize:15,border:'1px solid #ADD8E6',margin:5,width:100,alignSelf:'center',textAlign:'center'}}>
        {item.row}行{item.col}列
      </div>);

    return(
      <HomeLayout>

            <Row style={{minheight:2000}}  gutter={16}>
              <Col span={18}>
                <div style={{margin:'0px 0px 0px 70px'}}>
                  <img style={{height:200,width:'70%',flexAlign:'centre'}} src={require('../assets/screen.png')}/>
                  <ChooseSeat onChoose={this.chooseSeat.bind(this)}/>
                </div>
              </Col>

              <Col span={6} style={{background:'white',border:'black',display:'flex',flexDirection:'column'}}>
                <div style={{width:'100%',height:'15%',backgroundColor:'#ADD8E6',fontSize:20,fontWeight:'bold',textAlign:'center'}}>
                  票务信息
                </div>
                <div style={{padding:'25px 0px 10px 0px'}}>
                  <Row>
                    <Col span={8}>
                      <img src={require('../assets/m1.jpg')} style={{height:110,width:80}}/>
                    </Col>
                    <Col span={14}>
                      <div style={{fontWeight:'bold',fontSize:15}}>
                        《哈利波特与火焰杯》<br/>
                      </div>
                      剧情/奇幻<br/>
                      129分钟
                    </Col>
                  </Row>
                </div>
                <Divider/>
                <div style={{fontSize:18,fontWeight:'bold',lineHeight:'90%',padding:10}}>
                  <p>影院：xxx</p>
                  <p>场次：xxx时间xx号厅</p>
                  <p>

                    <Row gutter={16}>
                      <Col span={6}>座位:</Col>
                      <Col span={18}>{showlist}</Col>
                    </Row>

                  </p>
                  <p>总计：0元</p>
                </div>

                <div style={{alignSelf:'center',padding:'0px 0px 30px 0px'}}>
                <Button type="primary">购买</Button>
                </div>

              </Col>
            </Row>

      </HomeLayout>
    );
  }
}

export default connect(({seatChosen}) => ({
  seatChosen,
}))(ChooseSeatPage);
