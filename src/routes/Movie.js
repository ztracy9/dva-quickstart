import React from 'react';
import { Card, Col, Row,Button,Tabs,List,Icon} from 'antd';
import {withRouter} from 'react-router-dom';
import request from '../utils/request';
import HomeLayout from '../layout/Header/HomeLayout';
import SearchInput from '../components/Movie/SearchInput';
import ShowMovie from '../components/Movie/ShowMovie';
import styles from './Movie.css';
const TabPane = Tabs.TabPane;
const { Meta } = Card;

var mlist=[];
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

class Movie extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	data:[],
      movielist:[],
    	list:[],
    	notOn:[],
    	mainMovie:[],
    	value:"更多",
    	choice:false,//是否展开
    	icon:"down-circle",
    	show:true,//是否有展开选项
      renovation:0,
      mainButton:''
    }
  }

  onClick=()=>{
  	if(this.state.choice){
  		this.setState({
  			value:"更多",
    		choice:false,
    		icon:"down-circle"
  		});
  	}else{
  		this.setState({
  			value:"收起",
  			choice:true,
  			icon:"up-circle"
  		});
  	}
  }
  renovate(){
    let tp=this.state.renovation+1;
    this.setState({
      renovation:tp
    })
  }
  getMovieList(){//获取上映的电影信息
    let body={
      day:getNowFormatDate()
    }
    console.log('正在上映');
    console.log(body);
  	request('http://localhost:8080/movie/getByDate',JSON.stringify(body))
      .then(data => {
        this.setState({
         data:data
        });
        console.log('data');
        console.log(this.state.data);
        mlist=[];
        mlist.push(this.state.data[0]);
        this.setState({mainButton:this.state.data[0]});
        let moviedata=[];
        let len=6;
        if(this.state.data.length<=7){
        	len=this.state.data.length-1;
        	this.setState({
        		show:false
        	})
        }
    	for(let i=1;i<=len;i++){
    		moviedata.push(this.state.data[i]);
    	}
    	this.setState({
    		movielist:moviedata
   		});
   		if(this.state.show){
   			let getlist=[];
   			for(let i=7;i<this.state.data.length;i++){
   				getlist.push(this.state.data[i]);
   			}
   			this.setState({
    			list:getlist
   			});
   		}
    });
  }
  tabChange(value){
    this.props.history.push('/movieDetail/'+value);
  }
  getNoton(){//获取未上映电影信息
  	fetch('http://localhost:8080/movie/getNotOn')
  	.then(res => res.json())
    .then(res => {
    	console.log('未上映');
    	console.log(res);
    	this.setState({
    		notOn:res.data.data
    	});
    	console.log(this.state.notOn);
    });
  }
  componentWillMount(){
    this.getMovieList();
    this.getNoton();
  }
  handleClick(event){
    let id = event.target.id;
    this.props.history.push("/movieDetail/"+id);
  }
	render(){
		let listButton= this.state.notOn.map(i=>
			<TabPane key={i.id} tab={
				<Card style={{ width: 180,height:350 }} cover={<img alt="" src={"http://localhost:8080"+i.poster} className={styles.img}/>}>
					<Meta title={i.name} description={i.beginTime+"上映"}/>
				</Card>}
			/>
		);
		let i = this.state.mainButton;
		return(
      <HomeLayout>
        <div style={{padding:'30px 30px'}}>
          <div style={{background:'white',paddingBottom:'30px'}}>
            <div className={styles.setHead}>
              <h3 className={styles.setTitle}>正在热映{this.state.data.length}部</h3>
              <SearchInput placeholder="请输入影片名称" style={{ width: 250 ,paddingTop:'30px' }} />
            </div>
            <div style={{paddingLeft:'30px',paddingRight:'15px'}}>
              <Row >
                <Col span={6}>
                  <div>
                    <img src={"http://localhost:8080"+i.poster} style={{height:'350px',width:'250px'}}/>
                    <div className={styles.setFlex}>
                      <div style={{fontWeight:'600',fontSize:'18px'}}>{i.name}</div>
                      <div>评分：{i.score}</div>
                    </div>
                    <div className={styles.setFlex}>
                      <div style={{fontSize:'16px',paddingTop:'10px'}}>{i.time}-{i.kind}</div>
                      <Button type="primary" id={i.id} onClick={this.handleClick.bind(this)}>选座购票1</Button>
                    </div>
                  </div>


                </Col>
                <Col span={18}>
                <div style={{paddingTop:'10px'}}>
                  <List
                    grid={{column:4}}
                    dataSource={this.state.movielist}
                    renderItem={item=>(
                      <List.Item>
                        <Row gutter={16}>
                          <Col span={12}>
                            <img src={"http://localhost:8080"+item.poster} style={{height:'190px',width:'130px'}}/>
                          </Col>
                          <Col span={12}>
                            <div style={{paddingTop:'0px'}}>
                              {item.name.length>8?
                                <p style={{fontSize:'14px'}}>{item.name}</p>:
                                <p style={{fontSize:'17px'}}>{item.name}</p>}
                              <p>评分：{item.score}</p>
                              <p>时长：{item.duration}分钟</p>
                              {item.movieType.length>8?
                                <p style={{fontSize:'10px'}}>{item.movieType}</p>:
                                <p>{item.movieType}</p>
                              }
                              <Button id={item.id} type="primary" onClick={this.handleClick.bind(this)}>选座购票</Button>
                            </div>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </div>
                </Col>
              </Row>
            </div>
            {this.state.show?<div>
              <ShowMovie choice={this.state.choice} data={this.state.list}/>
              <div style={{textAlign:'center'}}>
                <div onClick={this.onClick} style={{fontSize:'20px'}}><Icon type={this.state.icon} style={{color:'#1E90FF'}}/>{this.state.value}</div>
              </div>
            </div>:''}
          </div>
        </div>
        <div style={{padding:'20px 60px'}}>
          <div className={styles.will}>
            <div className={styles.setHead}>
              <h3 className={styles.setTitle}>即将上映{this.state.notOn.length}部</h3>
            </div>
            <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 400 }} onChange={this.tabChange.bind(this)}>
              {listButton}
            </Tabs>
          </div>
        </div>
      </HomeLayout>
		);
	}
}

Movie.propTypes = {

};

export default withRouter(Movie);
