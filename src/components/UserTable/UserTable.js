import React from 'react';
import { Table,Button,Row,Col,Input} from 'antd';
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  }, {
    title: '昵称',
    dataIndex: 'nickname',
  },{
    title: '密码',
    dataIndex: 'password',
  }, {
    title: '邮箱',
    dataIndex: 'email',
  },{
    title: '手机号',
    dataIndex: 'phone',
    }
];
class UserTable extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      user_list:[],
      selectedRowKeys: [],
      loading: false,
    };
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  getUserList(){
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(res => {
        this.setState({
         user_list: res
        });
      });
  }
  componentWillMount(){
    this.getUserList();
  }
  render(){
    const { loading, selectedRowKeys,user_list } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return(
      <div style={{width:800,height:600,margin:40}}>
        <div style={{ marginBottom: 16 }}>
          <Row>
            <Col span={2}>
              <Button type="primary"  disabled={!hasSelected} loading={loading}>
                Delete
              </Button>
            </Col>
            <Col span={3}>
              <Button >Add</Button>
            </Col>
            <Col>
              <Input style={{width:150}}/>
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>

        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns}
               dataSource={user_list}  pagination={{pageSize:10}}/>

      </div>
    );
  }
}
export default UserTable;
