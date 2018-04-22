import React from 'react';
import { Table,Button,Row,Col,Input} from 'antd';
import ShowTimeWindow from './ShowTimeWindow';
const Search = Input.Search;
const city=['','上海','杭州','南京','扬州'];
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
  },{
    title:'地址',
    dataIndex: 'address'
  },{
    title:'城市',
    dataIndex: 'city',
    filters:[{
      text: '上海',
      value: '上海',
    },{
      text:'扬州',
      value:'扬州',
    },{
      text:'南京',
      value:'南京',
    },{
      text:'杭州',
      value:'杭州',
    }
    ],
    onFilter: (value, record) => record.city == value,
  },{
    title: '操作',
    key:'action',
    render:(text, record)=>(
      <ShowTimeWindow cinema={record}/>
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
    let templist=[];
    fetch('http://localhost:8080/cinema/getAll')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let data = res.data.data;
        for(let i in data){
          let temp = {
            id:data[i].id,
            name:data[i].name,
            address:data[i].address,
            city:city[data[i].cityId],
          }
          templist.push(temp);
        }
        console.log(templist);
        this.setState({
          cinema_list:templist
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
