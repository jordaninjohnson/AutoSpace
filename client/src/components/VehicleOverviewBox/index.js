import React from 'react';
import "./style.css";


function VehicleOverviewBox(props) {
  return (
    <div className='vehicleInfoBox'>
      <div className='vehicleBoxTopInfo'>
        <h2 className='vehicleBoxTitle'>{props.title}</h2>
      </div>
      <br></br>
      <span className='vehicleBoxMoreInfo'>
        <div class="columns">
          <div class="column">
            <p className='vehicleBoxText'>Make: {props.vehicle.make}</p>
            <p className='vehicleBoxText'>Model: {props.vehicle.model}</p>
            <p className='vehicleBoxText'>Year: {props.vehicle.year}</p>
            <p className='vehicleBoxText'>Type: {props.vehicle.type}</p>
            <p className='vehicleBoxText'>VIN: {props.vehicle.vin}</p>
          </div>
          <div className="column">
            <p className='vehicleBoxText'>Owned since: {props.vehicle.yearPurchased}</p>
            <p className='vehicleBoxText'>Location: {props.vehicle.locationLastOwned}</p>
            <p className='vehicleBoxText'>Condition: {props.vehicle.condition}</p>
            <p className='vehicleBoxText'>Accidents: {props.vehicle.accidents}</p>
          </div>
        </div>
      </span>
    </div>
  );
}

export default VehicleOverviewBox;