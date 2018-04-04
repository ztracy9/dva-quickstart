import React from 'react';
import { Icon, Divider,Button, Cascader,Tabs,List,Row,Col} from 'antd';
import {withRouter} from 'react-router-dom';
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
    console.log(cid);
    fetch('http://localhost:3000/cinema/'+cid)
      .then(res => res.json())
      .then(res => {
        this.setState({
           cinemaName:res.name,
           cinemaLocate:res.location
        });
      });
  }
  //根据cid,mid,和日期获取时刻表
  getTimeList(cid,mid,tday){
    fetch('http://localhost:3000/Time')
      .then(res => res.json())
      .then(res => {
        this.setState({
          TimeList: res
        });
      });
  }
  componentWillMount () {
    const {mid,cid} = this.props;
    let day = new Date();
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
     return(
       <div>
         <div>
           <p style={{fontWeight:'bold',fontSize:20}}>{this.state.cinemaName}</p>
           <p>{this.state.cinemaLocate}</p>
         </div>
         <div style={{padding:'30px 0px 0px 30px'}}>
           <Tabs defaultActiveKey="1" onChange={this.DateChange.bind(this)}>
             <TabPane tab={arr[0]} key="0"></TabPane>
             <TabPane tab={arr[1]} key="1"></TabPane>
             <TabPane tab={arr[2]} key="2"></TabPane>
             <TabPane tab={arr[3]} key="3"></TabPane>
             <TabPane tab={arr[4]} key="4"></TabPane>
           </Tabs>
         </div>

         <div style={{padding:'0px 10px 0px 60px'}}>

           <List
             dataSource={this.state.TimeList}
             renderItem={item => (
               <List.Item>
                 <Row gutter={80}>
                   <Col span={6} style={{fontWeight:'bold'}}>{item.startTime}</Col>
                   <Col span={6}>{item.romm}号厅</Col>
                   <Col span={6}>{item.price}元</Col>
                   <Col span={6}>
                     <Button type="primary" onClick={this.handleClick.bind(this)}>
                       选座购票<Icon type="right" />
                     </Button>
                   </Col>
                 </Row>
               </List.Item>
             )}
           />

         </div>
       </div>
     );
   }
}

export default withRouter(TimePoint);
