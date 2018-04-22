import React from 'react';
import {Table, Avatar} from 'antd';
import { Pagination } from 'antd';
import Comment from './Comment';
import styles from './HistoryMovie.css';
import request from '../../utils/request';
const { Column, ColumnGroup } = Table;

var listData=[];
const pagination={
	pageSize:2,
	total:listData.length,
	onChange: (() => {}),
};
class HistoryMovie extends React.Component{
	constructor(props){
    	super(props);
    	this.state={
    		data:[]
    	}
	}
	componentWillMount(){
		let a=sessionStorage.getItem('userId');
    	let body={
      		uid:a
    	}
    	request('http://localhost:8080/movie/getWatched',JSON.stringify(body))//根据用户id获取历史电影记录
    	.then((data)=>{
    		/*console.log('历史电影');
    		console.log(data);*/
    		if(data){
    			this.setState({
    				data:data
    			});
    			console.log(this.state.data);
    		}
    	});
	}
	render(){
		return(
			<Table pagination={{pageSize:2}} dataSource={this.state.data} style={{background:'white'}} showHeader={false}>
				<Column
					dataIndex="avatar"
					render={(text,record)=>(
						<div style={{padding:'10px 20px'}}>
							<img width={160} height={240} alt="" src={"http://localhost:8080"+record.poster} />
						</div>
					)}
				/>
				<Column
					render={(text,record)=>(
						<div style={{paddingRight:'100px'}}>
							<div className={styles.lay}>
				  				<div className={styles.setAss}>
				  					<h2>{record.name}（{record.englishname}）</h2>
				  					<h4><Comment/></h4>
				  				</div>
				  				<div>上映时间：{record.beginTime}~{record.endTime}</div>
				  				<div>影片类别：{record.movieType}</div>
				  				<div className={styles.setPos}>影片详情：{record.description}</div>
				  			</div>
						</div>
					)}
				/>
		    </Table>
		);
	}
}

export default HistoryMovie;
