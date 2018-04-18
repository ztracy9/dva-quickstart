import React from 'react';
import CinemaManageTable from '../components/cinemaManage/CinemaManageTable';


class CinemaManagePage extends React.Component{
  constructor (props) {
    super(props);
  }
  render(){
    return(
      <div style={{margin:20,width:900}}>
        <CinemaManageTable/>
      </div>
    );
  }
}
export default CinemaManagePage;
