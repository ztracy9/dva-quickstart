import React from 'react';
import { Modal, Button ,Input,Row,Col,Select,List,Icon} from 'antd';
const Option = Select.Option;

class AddTimeWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movielist:[],//在次日可以选择的电影列表
      visible:false,
      roomlist:[],//此影院的所有厅的所剩场次
      amount:[0,0,0,0,0,0,0,0,0,0,0,0],  //要添加的场次数
      movieChosen:'',
    };
  }

  componentWillMount(){
    console.log('add-time-window:'+this.props.day);
    //获取这日期下所有可以选择的电影
    fetch('http://localhost:3000/movie')
      .then(res => res.json())
      .then(res => {
        let list = [];
        for(let i in res){
          let temp = {
            id:res[i].id,
            name:res[i].name
          }
          list.push(temp);
          this.setState({
            movielist:list
          });
      }});

    fetch('http://localhost:3000/room_left')
      .then(res => res.json())
      .then(res => {
        this.setState({
          roomlist:res
        });
      });
  }

  movieChose(value){
    console.log(value);
    this.setState({
      movieChose:value
    });
  }
  showModal () {
    this.setState({
      visible: true,
    });
  }
  //待完成
  handleOk = (e) => {
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
  findroomLeft(rid){
    const{roomlist} = this.state;
    for(let r in roomlist){
      if(roomlist[r].room==rid){
        return roomlist[r].left;
      }
    }
    return 0;
  }
  handleAddClick(event){
    let id = event.target.id;
    let max = this.findroomLeft(id);
    let list = this.state.amount;
    if(list[id]<max)
      list[id]++;
    this.setState({
      amount:list
    });
  }
  handleMinusClick(event){
    let id = event.target.id;
    let list = this.state.amount;
    if(list[id]>0)
      list[id]--;
    this.setState({
      amount:list
    });
  }
  render(){
    const{movielist,amount}= this.state;
    let id=0;
    const children=[];
    for (let i = 0; i < movielist.length; i++) {
      children.push(<Option key={movielist[i].id}>{movielist[i].name}</Option>);
    }
    return(
      <div>
        <Button onClick={this.showModal.bind(this)}>添加场次</Button>
        <Modal
          title="添加场次"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >

          <div style={{padding:20}}>
           选择电影&nbsp;
             <Select  style={{ width: 120 }} onChange={this.movieChose.bind(this)}>
               {children}
             </Select>

          </div>

          <div>
            <List dataSource={this.state.roomlist} renderItem={item=>(
              <List.Item>
                <Row style={{width:500}}>
                  <Col span={4}>{item.room}号厅</Col>
                  <Col span={6}>剩余{item.left}场次</Col>
                  <Col span={2}>
                    <Button id={item.room} size="small" onClick={this.handleAddClick.bind(this)}>
                      <Icon type="plus" />
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button id={item.room}   size="small" onClick={this.handleMinusClick.bind(this)}>
                      <Icon type="minus" />
                    </Button>
                  </Col>
                  <Col span={6}>
                    <div style={{paddingLeft:10,fontSize:15,color:'#1890ff'}}>
                      {amount[item.room]}
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}/>
          </div>

        </Modal>
      </div>
    );
  }

}

export default AddTimeWindow;
