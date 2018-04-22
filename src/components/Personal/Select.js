import React from 'react';
import NotSee from './NotSee';
import Setting from './Setting';
import Account from './Account';
import Password from './Password';
import AllTicket from './AllTicket';
import AccountBind from './AccountBind';
import HistoryMovie from './HistoryMovie';

class Select extends React.Component{
	constructor(props){
		super(props);
	}
	setChange=(val,e)=>{
		this.props.onChange(val,e);
	}
	render(){
		if(this.props.pid==="1"||this.props.pid==="11"){
			return <Setting handleChange={this.props.handleChange} url={this.props.url} text={this.props.text}/>;
		}else if(this.props.pid==="12"){
			return <AccountBind telenumber={this.props.telenumber} mail={this.props.mail} getTele={this.props.getTele}/>;
		}else if(this.props.pid==="13"){
			return <Password mail={this.props.mail} getPW={this.props.getPW}/>;
		}else if(this.props.pid==="2"){
			return <Account money={this.props.money}/>;
		}else if(this.props.pid==="3"||this.props.pid==="31"){
			return <AllTicket/>;
		}else if(this.props.pid==="32"){
			return <NotSee/>;
		}else{
			return <HistoryMovie/>;
		}
	}
}

export default Select;