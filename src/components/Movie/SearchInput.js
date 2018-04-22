import React from 'react';
import { Select } from 'antd';
import {withRouter} from 'react-router-dom';
import request from '../../utils/request';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    console.log(str);
    let body={
      str:value
    }
    request('http://localhost:8080/movie/getByStr',JSON.stringify(body))
      .then((d) => {
        console.log('电影');
        console.log(d);
        if (currentValue === value) {
          const result = d;
          const data = [];
          if(result){
            result.forEach((r) => {
            data.push({
              value: r.id,
              text: r.name,
            });
          });
          }

          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

class SearchInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      value: '',
    }
  }
  handleChange = (value) => {
    this.setState({ value });
    fetch(value, (data) => {
      this.setState({ data }
      )});
  }
  handleSelect(value){
    this.props.history.push("/movieDetail/"+value);
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={this.handleSelect.bind(this)}
        onChange={this.handleChange.bind(this)}
      >
        {options}
      </Select>
    );
  }
}
export default withRouter(SearchInput);
