import React from 'react';
import BookingOfficeNow from './BookingOfficeNow';
import BookingOfficeTop from './BookingOfficeTop';
import TypeFavourite from './TypeFavourite';

class ChartsShow extends React.Component{
  constructor (props) {
    super(props);
  }
  render(){
    return(
      <div>
        <div style={{padding:30}}>
          <BookingOfficeNow/>
        </div>
        <div style={{padding:50}}>
          <BookingOfficeTop/>
        </div>

        <div style={{padding:30}}>
          <TypeFavourite/>
        </div>
      </div>
    );
  }
}
export default ChartsShow;
