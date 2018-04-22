import React from 'react';
import {withRouter} from 'react-router-dom';
import { Card, Col, Row,Button,Tabs,List,Icon} from 'antd';

class Showmovie extends React.Component{
	constructor(props){
    	super(props);
	}
	handleClick(event){
    let id = event.target.id;
    this.props.history.push("/movieDetail/"+id);
  }
	render(){
		if(this.props.choice){
			return <div style={{paddingLeft:'30px'}}>
						<List
							grid={{gutter: 16,column:4}}
							dataSource={this.props.data}
							renderItem={item=>(
								<List.Item>
									<Row>
										<Col span={12}>
											<img src={"http://localhost:8080"+item.poster} style={{height:'190px',width:'130px'}}/>
										</Col>
										<Col>
											<div style={{paddingTop:'0px'}}>
												{item.name.length>8?
												<p style={{fontSize:'14px'}}>{item.name}</p>:
												<p style={{fontSize:'17px'}}>{item.name}</p>
												}
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
					</div>;
		}else{
			return <div></div>;
		}
	}
}
export default withRouter(Showmovie);
