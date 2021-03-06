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
    console.log(body);
    let list = [];
    request('http://localhost:8080/time/getTime',JSON.stringify(body))
      .then((res)=>{
        console.log(res);//处理传过来的时间
        list = res.filter(function(i){
          return moment(i.start_time) > moment();
        });
      })
      .then(()=>{
      console.log(list);
        this.setState({
          TimeList:list
        });
      })
  }
  componentWillMount () {
    const {mid,cid} = this.props;
    let day = moment().format('YYYY-MM-DD');
    this.getTimeList(cid,mid,day);
    this.getCinemaInfo(cid);
  }
  DateChange(key) {
    var now = moment();
    now.add(parseInt(key),'days');
    now = now.format('YYYY-MM-DD');
    this.getTimeList(this.props.cid,this.props.mid,now);
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
       dataIndex: 'time_id',
       render:(text, record)=>(
         <div style={{fontWeight:'bold',fontSize:16}}>
           <Row>
             <Col span={6}>{moment(record.start_time).format('HH:mm')}</Col>
             <Col span={6}>{record.hall_number}号厅</Col>
             <Col span={6}>{record.cost}元</Col>
             <Col span={6}>
               <TimeButton id={record.time_id}/>
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
           <Tabs defaultActiveKey="0" onChange={this.DateChange.bind(this)} size="small">
             <TabPane tab={arr[0]} key="0" ></TabPane>
             <TabPane tab={arr[1]} key="1"></TabPane>
             <TabPane tab={arr[2]} key="2"></TabPane>
             <TabPane tab={arr[3]} key="3"></TabPane>
             <TabPane tab={arr[4]} key="4"></TabPane>
           </Tabs>
         </div>

         <div style={{padding:'0px 100px 0px 30px'}}>

             <Table rowKey={record => record.time_id} columns={columns} dataSource={this.state.TimeList}
                    showHeader={false} pagination={{pageSize:5}}/>

         </div>
       </div>
     );
   }
}

export default withRouter(TimePoint);
