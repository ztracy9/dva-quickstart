import React from 'react';
import {withRouter} from 'react-router-dom';
import { Cascader,Table,Button,Icon, Divider,Tabs,Row,Col,Pagination} from 'antd';
import CinemaButton from './CinemaButton';
import moment from 'moment';
import request from '../../utils/request';

const options = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '2',
    label: '杭州',
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '3',
    label: '南京',
  },{
    value:'4',
    label:'扬州'
  }],
},{
  value:'1',
  label:'上海'
}
];

const TabPane = Tabs.TabPane;

class CinemaList extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      city: 4,
      cinemaList:[],
    };
  }
  componentWillMount(){
    this.getCinema();
  }

  //根据时间和电影获取影院信息
  getCinema(){
    let body={cid:1};
    console.log(body);
    request('http://localhost:8080/cinema/getByCity',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          cinemaList:res
        });
      });
  }
  changeCity(value,selectedOptions){
    if(value.length==1)
      this.setState({
         city: 1
      });
    else{
      this.setState({
        city: value[1]
      });
    }
    this.getCinema();
  }

  DateChange(key) {
     let day = moment().add(key,'day').format('YYYY-MM-DD');
    //根据时间和地点还有mid获取影院列表
    //console.log(day);
    this.getCinema();
  }

  render(){
    var now = new Date();
    var arr =[];
    var time = [];
    for(var i=0;i<5;i++)
    {
      time[i] = now;
      arr[i] = now.getMonth()+1+"月"+now.getDate()+"日";
      now.setDate(now.getDate()+1);
    }
    const{cinemaList} = this.state;
    const{movie} = this.props;
    const columns = [{
      title: '',
      dataIndex: 'id',
      render:(text, record)=>(
        <div>
          <Row style={{width:'600px'}}>
            <Col span={20}>
              <div style={{lineHeight:'95%'}}>
                <p style={{fontWeight:'bold',fontSize:18}}> {record.name} </p>
                <p > {record.address}</p>
              </div>
            </Col>
            <Col span={4}>
              <br/>
              <CinemaButton mid={movie.mid} id={record.id}/>
            </Col>
          </Row>
        </div>
      )
    }];

    return(
        <div style={{ padding: '30px',minHeight:'280px'}}>
          <div style={{fontWeight:'bold',fontSize:20,lineHeight:'30%'}}>
            <p>{movie.name}</p>
            <p>{movie.englishname}</p>
            <br/>
          </div>
          <br/>
          选择城市  <Cascader defaultValue={['江苏','4']} options={options}  onChange={this.changeCity.bind(this)} placeholder="Please select" />

          <Divider>以下是搜寻到的结果</Divider>
          <div>
            <Tabs defaultActiveKey="1" onChange={this.DateChange.bind(this)}>
              <TabPane tab={arr[0]} key="0"></TabPane>
              <TabPane tab={arr[1]} key="1"></TabPane>
              <TabPane tab={arr[2]} key="2"></TabPane>
              <TabPane tab={arr[3]} key="3"></TabPane>
            </Tabs>
          </div>
          <div style={{ padding: '10px 50px 30px 50px',minHeight:'280px'}}>
            <Table rowKey={record => record.id} columns={columns} dataSource={cinemaList}
                   showHeader={false} pagination={{pageSize:3}}/>

          </div>
        </div>
    );
  }
}

export default withRouter(CinemaList);
