import React from 'react';
import { Icon, Divider,Button, Cascader,Tabs,Table,Row,Col} from 'antd';
import {withRouter} from 'react-router-dom';
import TimeButton from './TimeButton';
import moment from 'moment';
import request from '../../utils/request';

const TabPane = Tabs.TabPane;

class TimePoint extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      TimeList:[],
      today:'',
      cinemaName:'',
      cinemaLocate:''
    };
  }

  //待写
  handleClick(event){
    this.props.history.push("/chooseSeat/1");
  }
  getCinemaInfo(cid){
    let body={cid:cid};
    request('http://localhost:8080/cinema/getById',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          cinemaName:res.name,
          cinemaLocate:res.address
        });
      });
  }
  //根据cid,mid,和日期获取时刻表
  getTimeList(cid,mid,tday){
    let body={
       cid:cid,
       mid:mid,
       day:tday,
    };
    request('http://localhost:8080/time/getTime',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          Timelist:res
        });
      });
  }
  componentWillMount () {
    const {mid,cid} = this.props;
    let day = moment().format('YYYY-MM-DD');
    this.getTimeList(mid,cid,day);
    this.getCinemaInfo(cid);
  }
  DateChange(key) {
    var now = new Date();
    now.setDate(now.getDate()+key);//now represent the chosen date
    this.getTimeList(this.props.mid,this.props.cid,now);
  }
   render(){
     var now = new Date();
     var arr =[];
     var time = [];
     for(var i=0;i<5;i++)
     {
       time[i] = now;
       arr[i] = now.getMonth()+1+"月"+now.getDate()+"日";
       now.setDate(now.getDate()+1);
     }
     const columns = [{
       title: '',
       dataIndex: 'id',
       render:(text, record)=>(
         <div style={{fontWeight:'bold',fontSize:16}}>
           <Row>
             <Col span={6}>{record.startTime}</Col>
             <Col span={6}>{record.room}号厅</Col>
             <Col span={6}>{record.price}元</Col>
             <Col span={6}>
               <TimeButton id={record.id}/>
             </Col>
           </Row>
         </div>
       )
     }];
     return(
       <div>
         <div>
           <p style={{fontWeight:'bold',fontSize:20}}>{this.state.cinemaName}</p>
           <p>{this.state.cinemaLocate}</p>
         </div>
         <div style={{padding:'30px 0px 0px 30px'}}>
           <Tabs defaultActiveKey="1" onChange={this.DateChange.bind(this)} size="small">
             <TabPane tab={arr[0]} key="0" ></TabPane>
             <TabPane tab={arr[1]} key="1"></TabPane>
             <TabPane tab={arr[2]} key="2"></TabPane>
             <TabPane tab={arr[3]} key="3"></TabPane>
             <TabPane tab={arr[4]} key="4"></TabPane>
           </Tabs>
         </div>

         <div style={{padding:'0px 100px 0px 30px'}}>

             <Table rowKey={record => record.id} columns={columns} dataSource={this.state.TimeList}
                    showHeader={false} pagination={{pageSize:5}}/>

         </div>
       </div>
     );
   }
}

export default withRouter(TimePoint);
