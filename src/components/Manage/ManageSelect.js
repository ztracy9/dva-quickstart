import React from 'react';
import UserTable from './UserManage/UserTable';
import MovieManageTable from './movieManage/MovieManageTable';
import CinemaManageTable from './cinemaManage/CinemaManageTable';

class ManageSelect extends React.Component{
	constructor(props){
		super(props);
	}
	setChange=(val,e)=>{
		this.props.onChange(val,e);
	}
	render(){
		if(this.props.mid==="1"){
			return <UserTable/>;
		}else if(this.props.mid==="2"){
			return <MovieManageTable/>;
		}else{
			return <CinemaManageTable/>;
		}
	}
}

export default ManageSelect;