import React from 'react';
import { Layout,Card, Button,Icon,Radio } from 'antd';
import {withRouter} from 'react-router-dom';
import HomeLayout from "../layout/HomeLayout";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

class CommentPage extends React.Component{
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
  render(){
    const {movie_info} = this.state;
    return(
      <HomeLayout>
      <Layout  style={{ padding: 24, minHeight: 260 }}>
        <Sider>
          <Card hoverable style={{ width: 220}} cover={<img alt="example" src={require('../assets/m1.jpg')} />}>
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
        </Content>
      </Layout>
      </HomeLayout>
    );
  }
}

export default CommentPage;
