import React from 'react';
import { Table,Button,Row,Col,Input,Icon} from 'antd';
import AddMovieWindow from './AddMovieWindow';
import EditMovieWindow from './EditMovieWindow';
import MovieSearch from './MovieSearch';
import ShowDetailWindow from './ShowDetailWindow';

const columns = [
{
    title: '编号',
    dataIndex: 'id',
}, {
  title: '名称',
  dataIndex: 'name',
},{
    title: '类型',
    dataIndex: 'movieType',
    filters: [{
      text: '喜剧',
      value: '喜剧',
    }, {
      text: '剧情',
      value: '剧情',
    }, {
      text: '动作',
      value: '动作',
    }, {
      text: '3D',
      value: '3D',
    }, {
      text: '科幻',
      value: '动画',
    }, {
      text: '爱情',
      value: '爱情',
    }, {
      text: '悬疑',
      value: '悬疑',
    }],
    onFilter: (value, record) => record.movieType == value,

}, {
    title: '开始时间',
    dataIndex: 'beginTime',
    sorter: (a, b) => {
      if(a.beginTime>b.beginTime)
        return -1;
      else
        return 1;
    },
},{
    title: '结束时间',
    dataIndex: 'endTime',
    sorter: (a, b) => {
      if(a.endTime>b.endTime)
        return -1;
      else
        return 1;
    },
},{
    title: '操作',
    key:'action',
    render:(text, record)=>(
      <Row>
        <Col span={12}> <EditMovieWindow movie={record}/></Col>
        <Col span={12}> <ShowDetailWindow movie={record}/></Col>
      </Row>
    )
  },
];


class MovieManageTable extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie_list:[],
      selectedRowKeys: [],
      loading: false,
    };
  }

  getMovieList(){
    fetch('http://localhost:3000/movie')
      .then(res => res.json())
      .then(res => {
        this.setState({
          movie_list: res
        });
      });
  }
  componentWillMount(){
    this.getMovieList();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onMovieSearch(m_name){
    let list = this.state.movie_list;
    list = list.filter(item=>item.name==m_name);
     this.setState({movie_list:list});
  }

  handleDelete(){
    const keys = this.state.selectedRowKeys;
    let delList = [];
    for(let k in keys){
      let item = {id:keys[k]};
      delList.push(item);
    }
    console.log(delList);
/*
    fetch('http://localhost:3000/movie',{
      method:'delete',
      body: JSON.stringify({
        delList
      }),
      headers: {
      'Content-Type': 'application/json'
    }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        });*/
  }
  render(){
    const { loading, selectedRowKeys,movie_list } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return(
      <div>
        <div style={{ marginBottom: 16 }}>
          <Row>
            <Col span={2}>
              <Button type="primary"  disabled={!hasSelected} loading={loading} onClick={this.handleDelete.bind(this)}>
                Delete
              </Button>
            </Col>
            <Col span={3}>
              <AddMovieWindow />
            </Col>
            <Col>
              <MovieSearch handleSelect={this.onMovieSearch.bind(this)} getAll={this.getMovieList.bind(this)}/>
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>

        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={movie_list}  pagination={{pageSize:10}}/>

      </div>
    );
  }
}

export default MovieManageTable;
