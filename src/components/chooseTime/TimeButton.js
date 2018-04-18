import React from 'react';
import {Button,Icon} from 'antd';
import {withRouter} from 'react-router-dom';

class TimeButton extends React.Component{
  constructor (props) {
    super(props);
  }
  handleClick(event){
    let id = event.target.id;
    this.props.history.push("/chooseSeat/"+id);
  }
  render(){
    return(
      <Button  type="primary" id ={this.props.id} onClick={this.handleClick.bind(this)}>
        选座购票<Icon type="right" />
      </Button>
    );
  }
}

export default withRouter( TimeButton);
