import React from 'react';
import { Select } from 'antd';
import querystring from 'querystring';
import request from '../../../utils/request';
const Option = Select.Option;

let timeout;
let currentValue;
let kind;

class SearchUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: ''
    }
  }
  fetch=(value,callback) =>{
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  kind=this.props.kind;
  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    let body;
    if(kind=="昵称"){
      body={
        str:value,
        type:1
      }
    }else if(kind=="邮箱"){
      body={
        str:value,
        type:2
      }
    }else if(kind=="手机"){
      body={
        str:value,
        type:3
      }
    }
    request('http://localhost:8080/user/getByStr',JSON.stringify(body))
      .then((d) => {
        if(d){
          if (currentValue === value) {
            const result = d;
            const data = [];
            result.forEach((r) => {
              if(kind==="昵称"){
                data.push({
                  value: r.name,
                  text: r.name,
                });
              }else if(kind==="邮箱"){
                data.push({
                  value: r.email,
                  text: r.email,
                });
              }else{
                data.push({
                  value: r.tel,
                  text: r.tel,
                });
              }            
            });
            callback(data);
          }
        }        
      });
    }
  timeout = setTimeout(fake, 300);
}

  handleChange = (value) => {
    this.setState({ value });
    this.fetch(value, data => this.setState({ data }));
  }
  textChange(value){
    if(value=="")
      this.props.getAll();
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value} >{d.text}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.props.handleSelect}
        onSearch={this.textChange.bind(this)}
      >
        {options}
      </Select>
    );
  }
}
export default SearchUser;