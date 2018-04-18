import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import pic1 from '../../assets/seat.png';
import pic2 from '../../assets/seat2.png';//green
import pic3 from '../../assets/seat3.png';//red
class Seat extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pic:pic1,
      chosen:false
    }
  }
  componentWillMount(){
    var forbiddenSeat=[
      {
        row:3,
        col:5
      },
      {
        row:4,
        col:6
      }
    ];
    const{row,col} = this.props;
    for(let i in forbiddenSeat){
      if(forbiddenSeat[i].row==row&&forbiddenSeat[i].col==col)
      {
        this.setState({
          pic:pic3
        });
      }
    }
  }
  handleClick(){
    let row = this.props.row;
    let col = this.props.col;
    this.props.choose(row,col);

    //每次点击之后改变图片颜色
    if(this.state.pic==pic3)
      return;
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
