import React, { useContext } from "react";
import API from "../utils/API";
import { AuthContext } from "../utils/authContext";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from '../components/Navbar copy';
import NavbarLink from '../components/NavbarLink';
import ActionBtn from '../components/ActionBtn';
import { Form } from "react-bootstrap";
import FormInputTwo from "../components/FormInputTwo";

export default function Mileage(props) {
    const [setUserId] = useContext(AuthContext);
    const [userVehicle, setVehicle] = useState({});
    const signOut = () => { setUserId({ showNotification: true }); localStorage.removeItem("jwt.Token"); }

    useEffect(() => {
        API
            .vehicleById(props.match.params.id)
            .then(data => setVehicle(data.data[0]))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <Navbar>
                <div></div>
                <Form inline>
                    <NavbarLink url='/members' active={true}>My Garage</NavbarLink>
                    <NavbarLink url='/vehicles'>Add Vehicle</NavbarLink>
                    <ActionBtn handleClick={signOut}>Sign Out</ActionBtn>
                </Form>
            </Navbar>
            <div className='garageWrapper'>
                <div className='garageSidebar'>
                </div>
                <div className='garageMain'>
                    <h1 className='garagePageTitle'>Update mileage</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='carInfoBox'>
                        <span className='carBoxTopInfo'>
                            <img className='carBoxImg' src={userVehicle.imageUrl} alt='Vehicle' />
                            <div>
                                <h2 className='carBoxTitle'>{userVehicle.year} {userVehicle.make} {userVehicle.model}</h2>
                                <p className='carBoxText'>Current Mileage: {userVehicle.mileage}</p>
                                <p className='carBoxText'>Vin: {userVehicle.vin}</p>
                                <FormInputTwo setWidth='width65' name='Mileage' type='number' label='New Mileage' id="year"></FormInputTwo>
                            </div>
                        </span>
                        <br></br>
                        <span className='carBoxMoreInfo'>
                            <div>
                                <p className='carBoxText'>Condition: {userVehicle.condition}</p>
                                <p className='carBoxText'>Accidents: {userVehicle.accidents}</p>
                            </div>
                            <div className='carBoxLinkContainer'>
                                <p className='carBoxLink'>Save</p>
                            </div>
                        </span>
                    </div>
                </div>
                <div className='garageSidebar'></div>
            </div>
        </div>
    );
}
