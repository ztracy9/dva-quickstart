import { Table, Avatar, Button, Spin, Rate,Row,Col } from 'antd';
import React from 'react';
import request from '../../utils/request';

const columns=[
  {
    title: '',
    dataIndex: 'id',
    render:(text, record)=>(
      <Row>
        <Col span={18}>
          <Row>
            <Col span={3}>
              <Avatar src={record.avatar}/>
              <p style={{fontWeight:'bold'}}>{record.name}</p>
            </Col>
            <Col span={18}>
              <div style={{paddingTop:10,fontSize:16}}>
                {record.comment}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Rate disabled defaultValue={record.rank} />
        </Col>
      </Row>
    )
  }
];

class CommentShow extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      cinemaList:[]
    }
  }
  componentWillMount(){
    let body = {mid:this.props.mid};
    request('http://localhost:8080/comment/getByMid',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          commentList:res
        });
      });
  }
  render() {
    const{commentList} = this.state;
    return (
      <div>
        <Table rowKey={record => record.id} columns={columns} dataSource={commentList}
               showHeader={false} pagination={{pageSize:8}}/>
      </div>
    );
  }
}

export default CommentShow;
