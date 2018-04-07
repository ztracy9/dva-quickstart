import React from 'react';
import AddMovieWindow from '../components/movieManage/AddMovieWindow';

class MovieManagePage extends React.Component{
  constructor (props) {
    super(props);
  }
  render(){
    return(
      <div>
        <AddMovieWindow/>
      </div>
    );
  }
}

export default MovieManagePage;
