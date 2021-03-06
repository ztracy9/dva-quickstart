import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import request from '../../utils/request';
import pic1 from '../../assets/seat.png';
import pic2 from '../../assets/seat2.png';//green
import pic3 from '../../assets/seat3.png';//red
class Seat extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pic:pic1,
      chosen:false,
      forbiddenSeat:[],
    }
  }
  componentWillMount(){
    let body = {tid:this.props.tid};
    const{row,col} = this.props;
    request('http://localhost:8080/time/getSaledSeat',JSON.stringify(body))
      .then((res)=>{
        for(let i in res){
          if(res[i].col==col&&res[i].row==row)
          {
            this.setState({
              pic:pic3
            });
          }
        }
      });
  }
  handleClick(){
    let row = this.props.row;
    let col = this.props.col;
    //每次点击之后改变图片颜色
    if(this.state.pic==pic3)
      return;
    this.props.choose(row,col);
    if(this.state.pic==pic1)
    {
      this.setState({
        pic:pic2
      })
    }
    else{
      this.setState({
        pic:pic1
      })
    }

  }
  render(){
    let pic = this.state.pic;
    return(
      <Button  ghost={true} style={{width:'100%',border:0}} onClick={this.handleClick.bind(this)} >
        <img   style={{height:30,width:30}} src={pic} alt=""/>
      </Button>
    );
  }
}

export default Seat;
