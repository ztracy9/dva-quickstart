import React from 'react';
import request from '../../utils/request';
import {Avatar,Table,Pagination} from 'antd';
const { Column, ColumnGroup } = Table;

var listData=[];
Date.prototype.toLocaleString = function() {
	let t1=this.getFullYear().toString();
	if (t1.length!==4){
		let tp;
		for(let i=t1.length;i<4;i++)
			tp+="0";
		t1=tp+t1;
	}
	let t2=(this.getMonth()+1).toString();
	if (t2.length==1)
		t2="0"+t2;
	let t3=this.getDate().toString();
	if (t3.length==1)
		t3="0"+t3;
	let t4=this.getHours().toString();
	if (t4.length==1)
		t4="0"+t4;
	let t5=this.getMinutes().toString();
	if (t5.length==1)
		t5="0"+t5;
	let t6=this.getSeconds().toString();
	if (t6.length==1)
		t6="0"+t6;
    return t1 + "/" + t2 + "/" + t3 + " " + t4 + ":" + t5 + ":" + t6;

}
class NotSee extends React.Component{
	constructor(props){
    	super(props);
    	this.state={
    		data:[],
    		renovation:1
    	}
	}
	renovate(){
    	let tp=this.state.renovation+1;
    	this.setState({
      		renovation:tp
    	})
  	}
	getDate(time){
		let tp=new Date(time);
		let t=tp.toLocaleString();
		return t;
	}
	componentWillMount(){
		let a=sessionStorage.getItem('userId');
    	let body={
      		uid:a
    	}
    	request('http://localhost:8080/order/getNotWatch',JSON.stringify(body))
    	.then((data)=>{
    		if(data){
    			this.setState({
    				data:data
    			});
    		}
    	});
    	this.renovate();
	}
	render(){
		return(
			<Table pagination={{pageSize:3}} dataSource={this.state.data} style={{padding:'20px 70px'}} showHeader={false}>
				<Column
					dataIndex="avatar"
					render={(text,record)=>(
						<div style={{paddingLeft:'50px'}}>
						<img src={"http://localhost:8080"+record.post} style={{height:'120px',width:'80px'}}/>
						</div>
					)}
				/>
				<Column
					render={(text,record)=>(
						<div style={{paddingLeft:'-20px'}}>
							<div style={{fontSize:'20px'}}>{record.movieName}</div>
							<div style={{color:'red'}}>{this.getDate(record.watchTime)}~{this.getDate(record.endTime)}</div>
							<div>购票时间：{this.getDate(record.orderTime)}</div>
							<div>{record.cinema}&nbsp;&nbsp;{record.hall}号厅&nbsp;&nbsp;{record.row}排{record.col}座</div>
							<div></div>
						</div>

					)}
				/>
				<Column
					render={(text,record)=>(
						<div style={{paddingRight:'50px'}}>
							<div style={{width:'80px',height:'80px',backgroundColor:'#E6E6FA',borderRadius:'50%'}}>
								<span style={{height:'80px',lineHeight:'80px',display:'block',color:'black',textAlign:'center'}}>￥{record.cost}</span>
							</div>

						</div>
					)}
				/>
			</Table>
		);
	}
}
export default NotSee;
