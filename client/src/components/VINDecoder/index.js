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
        <p className='vehicleBoxText'>Year: {props.carmdVinData.year}</p>
        <p className='vehicleBoxText'>Make: {props.carmdVinData.make}</p>
        <p className='vehicleBoxText'>Model: {props.carmdVinData.model}</p>
        <p className='vehicleBoxText'>Trim: {props.carmdVinData.trim}</p>
        <p className='vehicleBoxText'>Engine: {props.carmdVinData.engine}</p>
        <p className='vehicleBoxText'>Transmission: {props.carmdVinData.transmission}</p>
    </div>
    <div>
    <button onClick={props.onSubmit} class="button is-primary level-item">Request VIN Information</button>
    </div>    
    </span>
    </div>
);
}

export default VINDecoder;