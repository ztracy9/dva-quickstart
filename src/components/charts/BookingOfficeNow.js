import ReactEcharts from 'echarts-for-react';
import React from 'react';
import request from '../../utils/request';
import moment from 'moment';

class BookingOfficeNow extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie_booking:[
      ]
    }
  }
  componentWillMount()
  {
    let body = {
      date:moment().format('YYYY-MM-DD')
    };
    let list = [];
    request('http://localhost:8080/movie/getCntListAndOrder',JSON.stringify(body))
      .then((res)=>{
        this.setState({
          movie_booking:res
        });
      });
  }

getOption(){
  //获取data
  const mlist = this.state.movie_booking;
  const namelist = [];
  const soldlist = [];
  const arrangelist = [];
  const boxlist = [];
  for(let i in mlist){
    namelist.push(mlist[i].movieName);
    arrangelist.push(mlist[i].cntTime);
    soldlist.push(mlist[i].cntOrder);
    boxlist.push(mlist[i].boxOffice/10)
  }
  const option = {
    title: {
      text: '正在上映票房统计',
    },
    color: ['#99CCCC', '#FFEABF', '#C3CFEA'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['排片量', '售票数','票房(十元)']
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: namelist,
        axisLabel: {
          interval:0,
          rotate:20
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '排片量',
        type: 'bar',
        barGap: 0,
        data: arrangelist,
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle:{color:'black'},
          }
        },
      },
      {
        name: '售票数',
        type: 'bar',
        barGap: 0,
        data: soldlist,
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle:{color:'black'},
          }
        },
      },
      {
        name: '票房(十元)',
        type: 'bar',
        data:  boxlist,
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle:{color:'black'},
          }
        },
      },
    ]
  };
  return option;
}


  render(){
    return(
      <div>
        <div style={{padding:20}} >
        <ReactEcharts
          option={this.getOption()}

          />
        </div>
      </div>
    );
  }
}
export default BookingOfficeNow;
