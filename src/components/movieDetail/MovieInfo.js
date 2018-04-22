import { Layout,Card, Button,Icon,Radio } from 'antd';
import React from 'react';
import {withRouter} from 'react-router-dom';
import request from '../../utils/request';
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

function save5cast(cast){
  let list=cast.split(',');
  list.splice(5,list.length-1); //只保留5个主演
  return list.join(',');
}
class MovieInfo extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      movie_info: '',
    };
  }
  componentWillMount () {
  	let body = {mid:this.props.mid};
    request('http://localhost:8080/movie/getById',JSON.stringify(body))
    .then((res)=>{
      let cast=res.cast;
      res.cast=save5cast(cast);
    	this.setState({
    		movie_info:res
    	});
    });
  }
  handleClick(){
    let mid = this.props.mid;
    this.props.history.push("/cinema/"+mid);
  }
  render (){
    const {movie_info} = this.state;
    let imgurl="http://localhost:8080"+movie_info.poster;

    return(
      <Layout  style={{ padding: 24, minHeight: 260 }}>
        <Sider style={{backgroundColor:'rgba(0,0,0,0)'}}>
          <img alt="example " src={imgurl} style={{width:220,height:320}}/>
        </Sider>

        <Content style={{ padding:'30px 30px 30px 80px'}}>
          <div style={{fontWeight:'bold',fontSize:20,lineHeight:'30%',padding:'0px 0px 20px 0px'}}>
            <p>{movie_info.name}</p>
            <p>{movie_info.EnglishName}</p>
          </div>

         <div style={{fontSize:16,fontFamily:'微软雅黑',lineHeight:'70%'}}>
          <p>导演：{movie_info.director}</p>
          <p>国家：{movie_info.country}</p>
          <p>主演：{movie_info.cast}</p>
           <br/>
          </div>

          <p style={{fontSize:15,fontFamily:'微软雅黑'}}>剧情简介：{movie_info.description}</p>
          <div style={{alignSelf:'flex-end',padding:'20px 0px 0px 0px'}}>
            <Button type="primary" onClick={this.handleClick.bind(this)} style={{float:'left'}}>
              购票<Icon type="right" />
            </Button>
          </div>
        </Content>

      </Layout>
    );
  }
}

export default withRouter(MovieInfo);
