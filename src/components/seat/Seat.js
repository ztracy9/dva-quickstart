import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import pic1 from '../../assets/seat.png';
import pic2 from '../../assets/seat2.png';

class Seat extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pic:pic1,
      chosen:false
    }
  }
  handleClick(){
    //每次点击之后改变图片颜色
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
    let row = this.props.row;
    let col = this.props.col;
    this.props.choose(row,col);
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
