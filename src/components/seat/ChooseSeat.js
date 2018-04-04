import React from 'react';
import { Button,Row,Col,List } from 'antd';
import { routerRedux } from 'dva/router';
import SeatRow from './SeatRow';
import seatChosen from "../../models/seatChosen";

class ChooseSeat extends React.Component{
  constructor (props) {
    super(props);
  }


  render(){
    return(
      <div>
        <SeatRow row={1} onChoose={this.props.onChoose}/>
        <SeatRow row={2} onChoose={this.props.onChoose}/>
        <SeatRow row={3} onChoose={this.props.onChoose}/>
        <SeatRow row={4} onChoose={this.props.onChoose}/>
        <SeatRow row={5} onChoose={this.props.onChoose}/>
        <SeatRow row={6} onChoose={this.props.onChoose}/>
        <SeatRow row={7} onChoose={this.props.onChoose}/>
        <br/><br/><br/>
      </div>
    );
    }
}

export default ChooseSeat;
