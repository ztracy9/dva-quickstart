import React from 'react';
import {Button,Icon} from 'antd';
import {withRouter} from 'react-router-dom';

class CinemaButton extends React.Component{
  constructor (props) {
    super(props);
  }
  handleClick(event){
    let id = event.target.id;
    this.props.history.push("/timelist/"+this.props.mid+"/"+id);
  }
  render(){
    return(
      <Button  type="primary" id ={this.props.id} onClick={this.handleClick.bind(this)}>
        购票<Icon type="right" />
      </Button>
    );
  }
}

export default withRouter(CinemaButton);
