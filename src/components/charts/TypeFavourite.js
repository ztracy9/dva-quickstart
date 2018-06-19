import ReactEcharts from 'echarts-for-react';
import React from 'react';
import request from '../../utils/request';

class TypeFavourite extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      typeValue:[],
    }
  }

  componentWillMount()
  {
    let body = {
      top:'6'
    };
    let list= [];
    request('http://localhost:8080/movie/getTopType',JSON.stringify(body))
      .then((res)=>{
        for(let i  in res){
          var obj = res[i];
          var keys= Object.keys(obj);
          var item = {
            value:obj[keys[0]],
            name:keys[0]
          }
          list.push(item);
        }
      })
      .then(()=>{
        this.setState({
          typeValue:list
        });
      })
  }

  getOption(){
    const typeValue = this.state;

    var option = {
      title: {
        text: '年度最受欢迎类型'
      },
      color: ['#6CC2C2', '#455D94','#7992CA','#EEB4B4','#DE965A','#368585'],
      series: [
        {
          name: '访问来源',
          type: 'pie',

          radius: '78%',
          data:typeValue.typeValue,
          label: {
            normal: {
              formatter: '{b}:{c}: ({d}%)', //显示百分比
              textStyle: {
                fontWeight: 'normal',
                fontSize: 15
              }
            }
          },
        }
      ],
    };
      return option;
  }

  render(){
    return(
      <div>
        <div style={{padding:20}}>
          <ReactEcharts
            option={this.getOption()}
          />
        </div>
      </div>
    );
  }
}
export default TypeFavourite;
