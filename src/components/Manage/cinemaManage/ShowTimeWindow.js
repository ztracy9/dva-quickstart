import React from 'react';
import { Modal, Button ,Input,Row,Col,Tabs,List,Card,Divider} from 'antd';
import AddTimeWindow from './AddTimeWindow';
import HandAddWindow from './HandAddWindow';
import moment from 'moment';
import request from '../../../utils/request';
const TabPane = Tabs.TabPane;
//默认从两天后开始排片
class ShowTimeWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie_Timelist:[],
      visible:false,
      daylist:[],
      day:'',
      cid:'',
    };
  }
  componentWillMount(){
      this.setState({
        cid:this.props.cinema.id
      });
  }

  getMovie_Timelist(day){
     let body={
       cid:this.state.cid,
       day:day,
     };
     console.log(body);
    request('http://localhost:8080/time/getByCidAndDate',JSON.stringify(body))
      .then((res)=>{
        console.log(res);
       this.setState({
          movie_Timelist: res,
          visible: true,
        });
      });
  }
  //把visible写在get函数里主要是考虑到异步的问题，这里面Promise怎么写不造啊
  showModal () {
    var now = new Date();
    var arr =[];
    var time = [];
    now.setDate(now.getDate()+2);
    for(var i=0;i<3;i++)
    {
      time[i] = now;
      arr[i] = now.getMonth()+1+"月"+now.getDate()+"日";
      now.setDate(now.getDate()+1);
    }
    //daylist中存储两日后开始日期
    let date = moment().add(2,'d');
    this.setState({
      daylist:arr,
      day:date.format('YYYY-MM-DD')
    });
    this.getMovie_Timelist(date.format('YYYY-MM-DD'));
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });

  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  //根据选中日期更新列表，同时更新state
  DateChange(key) {
    let a = parseInt(key)+2;
    var now = moment();
    now.add(a,'days');
    now = now.format('YYYY-MM-DD');
    this.getMovie_Timelist(now);
    this.setState({day:now});
  }
  render(){
   const{daylist}= this.state;
    return(
      <div >
        <Button type="primary" size="small" onClick={this.showModal.bind(this)}>排片</Button>
        <Modal
          title={this.props.cinema.name}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
          width={700}
        >
          <Tabs defaultActiveKey="0" onChange={this.DateChange.bind(this)}>
            <TabPane tab={daylist[0]} key="0" ></TabPane>
            <TabPane tab={daylist[1]} key="1"></TabPane>
            <TabPane tab={daylist[2]} key="2"></TabPane>
          </Tabs>

          <div style={{width:600}}>
            <List
              dataSource={this.state.movie_Timelist}
              renderItem={item => (
                <List.Item>
                  <div style={{width:500}}>
                    <p style={{fontWeight:'bold',fontSize:16}}>电影：{item.name}</p>
                    <List  grid={{gutter:32,column: 4 }} dataSource={item.timelist} renderItem={ item=>(
                     <List.Item>
                      <Card title={moment(item.startTime).format('HH:mm')} style={{height:130,width:100}}>
                        <div style={{textAlign:'center'}}>
                          {item.hallId}号厅<br/>
                          {item.cost}元
                        </div>
                      </Card>
                    </List.Item>
                   )
                  }/>
                  </div>
                </List.Item>)
              }/>
          </div>
          <Divider/>
          <Row>
            <Col span={4} style={{fontWeight:'bold',fontSize:16}}>添加场次：</Col>
            <Col span={5}>
              <AddTimeWindow day={this.state.day} cid={this.props.cinema.id} />
            </Col>
            <Col span={5}>
              <HandAddWindow day={this.state.day} cid={this.props.cinema.id} />
            </Col>
          </Row>

        </Modal>
      </div>
    );
  }

}

export default ShowTimeWindow;
