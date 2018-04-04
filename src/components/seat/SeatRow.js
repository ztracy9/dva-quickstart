import React from 'react';
import { Button,Row,Col,Icon } from 'antd';
import Seat from './Seat';

const SeatRow = (prop)=>{
  let row = prop.row;
  let onChoose = prop.onChoose;
  return(
    <div style={{width:'600px',fontFamily:'Microsoft YaHei'}}>
      <Row gutter={16} id={row}>
        <Col span={3}>
          <div style={{textAlign:'centre',fontSize:17}}>
            第{row}排
          </div>
        </Col>
        <Col span={2}>
          <Seat col={1} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={2} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={3} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={4} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={5} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={6} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={7} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={8} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={9} row={row} choose={onChoose}/>
        </Col>
        <Col span={2}>
          <Seat col={10} row={row} choose={onChoose}/>
        </Col>
      </Row>
    </div>
  );
}
export default SeatRow;
