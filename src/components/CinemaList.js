import React from 'react';
import { connect } from 'dva';
import {withRouter} from 'react-router-dom';
import { Cascader,List,Button,Icon, Divider,Tabs,Row,Col} from 'antd';

const options = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '南京',
    label: '南京',
  },{
    value:'扬州',
    label:'扬州'
  }],
},{
  value:'上海',
  label:'上海'
}
];

const TabPane = Tabs.TabPane;

class CinemaList extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      city: '江苏扬州',
      cinemaList:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }
  componentWillMount(){
    this.getCinema();
  }

  getCinema(){
    fetch('http://localhost:3000/cinema')
      .then(res => res.json())
      .then(res => {
        this.setState({
         cinemaList: res
        });
      });

  }
  changeCity(value,selectedOptions){
    this.setState({
      city: value
    });
    this.getCinema();
  }

  DateChange(key) {
    var now = new Date();
    now.setDate(now.getDate()+key);//now represent the chosen date
    //根据时间和地点还有mid获取影院列表
    this.getCinema();
  }

  handleClick(event){
    let id = event.target.id;
    this.props.history.push("/timelist/"+this.props.mid+"/"+id);
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
    return(
        <div style={{ padding: '30px',minHeight:'280px'}}>
          <div style={{fontWeight:'bold',fontSize:20,lineHeight:'30%'}}>
            <p>哈利波特与火焰杯</p>
            <p>Harry Potter and the Goblet of Fire</p>
            <br/>
          </div>
          <br/>
          选择城市  <Cascader defaultValue={['江苏','扬州']} options={options}  onChange={this.changeCity} placeholder="Please select" />

          <Divider>以下是搜寻到的结果</Divider>
          <div>
            <Tabs defaultActiveKey="1" onChange={this.DateChange.bind(this)}>
              <TabPane tab={arr[0]} key="0"></TabPane>
              <TabPane tab={arr[1]} key="1"></TabPane>
              <TabPane tab={arr[2]} key="2"></TabPane>
              <TabPane tab={arr[3]} key="3"></TabPane>
            </Tabs>
          </div>
          <div style={{ padding: '50px',minHeight:'280px'}}>
            <List dataSource={this.state.cinemaList}
                  renderItem={item => (
                    <List.Item >
                     <div>
                       <Row style={{width:'600px'}}>
                         <Col span={20}>
                           <p style={{fontWeight:'bold',fontSize:18}}> {item.name} </p>
                           <p > {item.location}</p>
                         </Col>
                         <Col span={4}>
                           <br/>
                           <Button id={item.id} type="primary" onClick={this.handleClick}>
                             购票<Icon type="right" />
                           </Button>
                         </Col>
                       </Row>
                     </div>
                    </List.Item>
                  )}>

            </List>
          </div>
        </div>
    );
  }
}

export default withRouter(CinemaList);
