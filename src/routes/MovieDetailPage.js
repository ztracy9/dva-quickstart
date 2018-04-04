import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import MovieInfo from '../components/movieDetail/MovieInfo'
import CommentShow from '../components/movieDetail/CommentShow'
import HomeLayout from '../layout/HomeLayout';
const { Header, Footer, Sider, Content } = Layout;

const MovieDetailPage = () => {

  return (
   <HomeLayout>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
         <MovieInfo/>
        </div>

        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div>评论区</div>
          <CommentShow/>
        </div>
   </HomeLayout>
  );
};


export default connect()(MovieDetailPage);
