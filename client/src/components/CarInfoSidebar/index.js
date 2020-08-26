import React from 'react';
import "./style.css";


function CarInfoSidebar(props) {
  return (
    <div className='carInfoSidebar'>
      <img className='carAvatar' src={props.vehicle.imageUrl} alt='Profile'/>
    </div>
  );
}

export default CarInfoSidebar;