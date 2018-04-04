import { Layout,Card, Button,Icon,Radio } from 'antd';
import React from 'react';
import {withRouter} from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;


class MovieInfo extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      movie_info: ''
    };
  }
  componentWillMount () {
    fetch('http://localhost:3000/movie/1')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          movie_info: res
        });
      });
  }
  handleClick(){
    this.props.history.push("/cinema/1");
  }
  render (){
    const {movie_info} = this.state;
    return(
      <Layout  style={{ padding: 24, minHeight: 260 }}>
        <Sider>
          <Card hoverable style={{ width: 220 }} cover={<img alt="example" src={require('../../assets/m1.jpg')} />}>
            <Meta
              title="xxxxxxxxxxxx"
              description="www.instagram.com"
            />
          </Card>
        </Sider>

        <Content style={{ padding:'30px 30px 30px 80px'}}>
          <div style={{fontWeight:'bold',fontSize:20,lineHeight:'30%',padding:'0px 0px 20px 0px'}}>
            <p>哈利波特与火焰杯</p>
            <p>Harry Potter and the Goblet of Fire</p>
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
