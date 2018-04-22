import React from 'react';
import AddMovieWindow from '../components/movieManage/AddMovieWindow';
import {List,Button,Row,Col,Icon} from 'antd';
import HomeLayout from '../layout/HomeLayout';
import MovieMangeTable from '../components/movieManage/MovieManageTable';

class MovieManagePage extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    return(
      <div style={{width:870,height:600,margin:40}}>
        <MovieMangeTable/>
      </div>
    );
  }

}

export default MovieManagePage;
