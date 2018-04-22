import React from 'react';
import { Select,Icon } from 'antd';
import querystring from 'querystring';
import request from '../../utils/request';
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
    let body={
      str:value
    };
    request('http://localhost:8080/movie/getByStr',JSON.stringify(body))
      .then((d) => {
        console.log(d);
        if (currentValue === value) {
          const result = d;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r.name,
              text: r.name,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
  }


class MovieSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      data: [],
      value: '',
    }
  }

  handleChange = (value) => {
    this.setState({ value });
    fetch(value, data => this.setState({data}));
  }

  textChange(value){
    if(value=="")
      this.props.getAll();
  }

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div>
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder="电影名称"
        style={{width:150}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
        onSelect={this.props.handleSelect}
        onSearch={this.textChange.bind(this)}
      >
        {options}
      </Select>
        <Icon type="search" />
      </div>
    );
  }
}
export default MovieSearch;
