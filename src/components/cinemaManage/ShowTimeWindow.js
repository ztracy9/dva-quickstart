import React from 'react';
import { Modal, Button ,Input,Row,Col,Tabs,List,Card} from 'antd';
import AddTimeWindow from './AddTimeWindow';
import moment from 'moment';
const TabPane = Tabs.TabPane;
//默认从两天后开始排片
class ShowTimeWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie_Timelist:[],
      visible:false,
      daylist:[],
      day:''
    };
  }
  componentWillMount(){
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
    this.setState({
      daylist:arr
    });
  }
  getMovie_Timelist(cid,day){
      fetch('http://localhost:3000/movie_Timelist')
        .then(res => res.json())
        .then(res => {
          this.setState({
            movie_Timelist: res,
            visible:true
          });
        });
  }
  //把visible写在get函数里主要是考虑到异步的问题，这里面Promise怎么写不造啊
  showModal () {
    let ci = 1;
    let day = this.state.daylist[0];
    this.getMovie_Timelist();
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
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
    this.getMovie_Timelist();
    this.setState({day:now});
    console.log(now);
  }
  render(){
   const{daylist}= this.state;
    return(
      <div>
        <Button type="primary" size="small" onClick={this.showModal.bind(this)}>排片</Button>
        <Modal
          title={this.props.cinema}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Tabs defaultActiveKey="0" onChange={this.DateChange.bind(this)}>
            <TabPane tab={daylist[0]} key="0" ></TabPane>
            <TabPane tab={daylist[1]} key="1"></TabPane>
            <TabPane tab={daylist[2]} key="2"></TabPane>
          </Tabs>

          <div>
            <List
              dataSource={this.state.movie_Timelist}
              renderItem={item => (
                <List.Item>
                  <div>
                    <p style={{fontWeight:'bold',fontSize:16}}>电影：{item.name}</p>
                  <List  grid={{ gutter: 32, column: 4 }} dataSource={item.timelist} renderItem={ item=>(
                    <List.Item>
                      <Card title={item.startTime} style={{height:130}}>
                        <div style={{textAlign:'center'}}>
                          {item.room}号厅<br/>
                          {item.price}元
                        </div>
                      </Card>
                    </List.Item>)
                  }/>
                  </div>
                </List.Item>)
              }/>
          </div>
         <AddTimeWindow day={this.state.day}/>
        </Modal>
      </div>
    );
  }

}

export default ShowTimeWindow;
