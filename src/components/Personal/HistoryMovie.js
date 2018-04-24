import React from 'react';
import {Table, Avatar} from 'antd';
import { Pagination } from 'antd';
import Comment from './Comment';
import styles from './HistoryMovie.css';
import request from '../../utils/request';
const { Column, ColumnGroup } = Table;

var listData=[];

class HistoryMovie extends React.Component{
	constructor(props){
    	super(props);
    	this.state={
    		data:[]
    	}
	}
	componentWillMount(){
		let a=sessionStorage.getItem('userId');
		let list = [];
    	let body={
      		uid:a
    	}
    	request('http://localhost:8080/movie/getWatched',JSON.stringify(body))//根据用户id获取历史电影记录
    	.then((data)=>{
    		if(data){
    		  list = data;
    			for(let i=0;i<data.length;i++){
    				  let body={
						  mid:data[i].id,
						  uid:a
					    }
					request('http://localhost:8080/comment/getByMovieAndUser',JSON.stringify(body))
      				.then(res=> {
      					if(res){
      						list[i].isComment=1
      					}else{
      						list[i].isComment=0
      					}
      				});
    			}
    		}
    	})
        .then(()=>{
    	    this.setState({
            data:list
          });
        })

	}

	render(){
	  console.log('data');
	  console.log(this.state.data);
		return(
		  <div >
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
				  					<h4>
				  					{record.isComment?"已评价":<Comment movieId={record.id}/>}
				  					</h4>
				  				</div>
				  				<div>上映时间：{record.beginTime}~{record.endTime}</div>
				  				<div>影片类别：{record.movieType}</div>
				  				<div className={styles.setPos}>影片详情：{record.description}</div>
				  			</div>
						</div>
					)}
				/>
		    </Table>
      </div>
		);
	}
}

export default HistoryMovie;
