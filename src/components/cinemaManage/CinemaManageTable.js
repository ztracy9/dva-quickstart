import React from 'react';
import { Table,Button,Row,Col,Input} from 'antd';
import ShowTimeWindow from './ShowTimeWindow';
const Search = Input.Search;
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
  },{
    title:'地址',
    dataIndex: 'location'
  },{
    title:'城市',
    dataIndex: 'city',
    filters:[{
      text: '上海',
      value: '上海',
    },{
      text:'扬州',
      value:'扬州',
    }],
    onFilter: (value, record) => record.city == value,
  },{
    title: '操作',
    key:'action',
    render:(text, record)=>(
      <ShowTimeWindow cinema={record.name}/>
    )
  }
]
class CinemaManageTable extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      cinema_list:[],
    };
  }
  componentWillMount(){
    fetch('http://localhost:3000/cinema')
      .then(res => res.json())
      .then(res => {
        this.setState({
          cinema_list: res
        });
      });
  }

  render(){
    const {cinema_list} = this.state;
    return(
      <div>
        <Table  rowKey={record => record.id} columns={columns} dataSource={cinema_list}  pagination={{pageSize:10}}/>
      </div>
    );
  }
}

export default CinemaManageTable;
