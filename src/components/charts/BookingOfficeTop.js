import ReactEcharts from 'echarts-for-react';
import React from 'react';
import request from '../../utils/request';

class BookingOfficeTop extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      movie_booking:[]
    }
  }

  componentWillMount()
  {
    let body = {
      top:'6'
    };
    request('http://localhost:8080/movie/getTopX',JSON.stringify(body))
      .then((res)=>{
        console.log(res);
        this.setState({
          movie_booking:res
        });
      });
  }

  getOption(){
    //获取data
    const mlist = this.state.movie_booking;
    const namelist = [];
    const boxlist = [];
    for(let i in mlist){
      namelist.push(mlist[i].movieName);
      boxlist.push(mlist[i].boxOffice)
    }
    const option = {
      title:{text:'年度票房Top榜'},
      color: ['#99CCCC'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['票房']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
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
          name: '票房',
          type: 'bar',
          data: boxlist,
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
        <div style={{padding:20}}>
          <ReactEcharts
            option={this.getOption()}

          />
        </div>
      </div>
    );
  }
}
export default BookingOfficeTop;
