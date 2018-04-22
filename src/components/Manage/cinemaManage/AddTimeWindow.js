import React from 'react';
import { Modal, Button ,Input,Row,Col,Select,List,Icon,message,Divider} from 'antd';
import request from '../../../utils/request';
const Option = Select.Option;

class AddTimeWindow extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movielist:[],//在次日可以选择的电影列表
      visible:false,
      roomlist:[],//此影院的所有厅号
      amount:[],  //要添加的场次数
      movieChosen:'',
      halllist:[],
      price:'',
    };
  }

  movieChose(value){
    this.setState({
      movieChosen:value
    });
    let list=[];
    for(let i in this.state.roomlist){
      let body={
        mid:value,
        day:this.props.day,
        hid:this.state.roomlist[i]
      };
      request('http://localhost:8080/time/checkAuto',JSON.stringify(body))
        .then((res)=>{
          let temp={
            room:body.hid,
            left:res
          };
          list.push(temp);
        })
        .then(()=>{
          this.setState({halllist:list});
        })
    }
  }

  showModal () {
    let t=[];
    for(let i=0;i<40;i++)//厅号不得超过40
    {
      t.push(0);
    }
    this.setState({amount:t });

    let body={day:this.props.day};
    //获取这日期下所有可以选择的电影
    request('http://localhost:8080/movie/getByDate',JSON.stringify(body))
      .then((res)=>{
        let list = [];
        for(let i in res) {
          let temp = {
            id: res[i].id,
            name: res[i].name
          }
          list.push(temp);
        }
        this.setState({
          movielist:list
        });
      });

    let body2={cid:this.props.cid};
    let r_list=[];
    request('http://localhost:8080/cinema/getHall',JSON.stringify(body2))
      .then((res)=>{
        for(let i in res){
          r_list.push(res[i].id);
        }
      })
      .then(()=>{
        this.setState({
          roomlist:r_list
        })
      });
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    const{amount} = this.state;
    for(let i in this.state.roomlist){
      let id=this.state.roomlist[i];
      if(amount[id]>0){
        let body={
          "hid":id,
          "mid":this.state.movieChosen,
          "day":this.props.day,
          "cnt":amount[id],
          "cost":this.state.price
        };
        if(body.hid==''||body.mid==''||body.cost==''){
          message.warning('输入信息不完整,无法排片！');
          return;
        }
        console.log(body);
        request('http://localhost:8080/time/autoAdd',JSON.stringify(body))
          .then((res)=>{
             console.log(res);
             if(res.length>0)
                message.success('排片成功');
             else
               message.error('添加场次失败');
          })
          .then(()=>{
            this.setState({
              visible: false,
            });
          })
      }
    }
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  findroomLeft(rid){
    const{halllist} = this.state;
    for(let r in halllist){
      if(halllist[r].room==rid){
        return halllist[r].left;
      }
    }
    return 0;
  }

  priceChange(event){
    this.setState({price:event.target.value});
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
        <Button type='primary' onClick={this.showModal.bind(this)}>自动添加</Button>
        <Modal
          title="自动添加场次"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
        >
          <div style={{padding:10,fontWeight:'bold',fontSize:15}}>
            日期：{this.props.day}
          </div>
          <Row>
            <Col span={12}>
              <div style={{padding:10}}>
                选择电影&nbsp;
                <Select  style={{ width: 120 }} onChange={this.movieChose.bind(this)}>
                  {children}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div style={{padding:10}}>
               票价：<Input id="cost" onChange={this.priceChange.bind(this)} style={{width:100}}/> &nbsp;元
              </div>
            </Col>
          </Row>
          <Divider/>
          <div style={{paddingLeft:20}}>
            <List dataSource={this.state.halllist} renderItem={item=>(
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
