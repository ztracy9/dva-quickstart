import React from 'react';
import { Modal, Button ,Input,Row,Col,Select,List,Icon,message} from 'antd';
import request from '../../utils/request';
const Option = Select.Option;
class HandAddWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movielist: [],//在次日可以选择的电影列表
      visible: false,
      roomlist: [],//此影院的所有厅号
      movieChosen: '',
      halllist: [],
      price: '',
      hallChosen:'',
      beginTime:'',
    };
  }

  showModal () {
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
        console.log(res);
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

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
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

  hidChose(value){
    this.setState({hallChosen:value});
  }

  priceChange(event){
    this.setState({price:event.target.value});
  }

  beginTimeChange(event){
    let t = event.target.value;
    let time = this.props.day+" "+t+":00";
    this.setState({beginTime:time});
  }

  handleOk = (e) => {
    const{amount} = this.state;
        let body={
          "hid":this.state.hallChosen,
          "mid":this.state.movieChosen,
          "day":this.props.day,
          "cost":this.state.price,
          "beginTime":this.state.beginTime
        };
       if(body.hid==''||body.mid==''||body.cost==''||body.beginTime==''){
           message.warning("输入信息不完整,无法排片！");
          return;
        }
        console.log(body);
        request('http://localhost:8080/time/add',JSON.stringify(body))
          .then((res)=>{
            if(res)
            message.success('排片成功');
            else
              message.error('排片失败');
          })
          .then(()=>{
            this.setState({
              visible: false,
            });
          });
  }

  render(){
    const{movielist,halllist}= this.state;
    let id=0;
    const children=[];
    for (let i = 0; i < movielist.length; i++) {
      children.push(<Option key={movielist[i].id}>{movielist[i].name}</Option>);
    }
    const hidchidlren=[];
    for(let i=0;i<halllist.length;i++){
      let temp = halllist[i];
      if(temp.left>0){
        hidchidlren.push(<Option key={temp.room}>{temp.room}</Option>)
      }
    }
    return(
      <div>
        <Button type='primary' onClick={this.showModal.bind(this)}>手动添加</Button>
        <Modal
          title="手动添加场次"
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
          <br/>
          <Row>
            <Col span={12}>
              <div style={{paddingLeft:10}}>
                选择要排片的影厅
                <Select  style={{ width: 120 }} onChange={this.hidChose.bind(this)}>
                  {hidchidlren}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div>
                开始时间：<Input style={{width:120}} onChange={this.beginTimeChange.bind(this)}/>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default HandAddWindow;
