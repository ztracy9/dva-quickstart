import React from 'react';
import { Layout } from 'antd';
import MovieInfo from '../components/movieDetail/MovieInfo'
import CommentShow from '../components/movieDetail/CommentShow'
import HomeLayout from '../layout/Header/HomeLayout';
const { Header, Footer, Sider, Content } = Layout;

class MovieDetailPage extends React.Component{
  constructor (props) {
    super(props);
  }
  render(){
    let mid = this.props.match.params.mid;
    return (
      <HomeLayout>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <MovieInfo mid={mid}/>
        </div>

        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div style={{paddingBottom:10,fontSize:18,fontWeight:'bold'}}>评论区</div>
          <CommentShow mid={mid}/>
        </div>
      </HomeLayout>
    );
  }
}


export default MovieDetailPage;
