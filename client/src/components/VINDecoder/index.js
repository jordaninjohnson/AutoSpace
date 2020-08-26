import React from 'react';
import "./style.css";


function VINDecoder(props) {
console.log(props);
return (
    <div className='vehicleInfoBox'>
    <div className='vehicleBoxTopInfo'>
        <h2 className='vehicleBoxTitle'>CarMD VIN Decoder</h2>
    </div>
    <div className='vehicleBoxTopInfo'>
    <h3 className='vehicleBoxTitle'>Unravel information inside of your VIN</h3>
    </div>
    <br></br>
    <span className='vehicleBoxMoreInfo'>
    <div>
        <p className='vehicleBoxText'>VIN: {props.vehicle.vin}</p>
    </div>
    <div>
    <button class="button is-primary level-item">Request VIN Information</button>
    </div>    
    </span>
    </div>
  );
}

export default VINDecoder;