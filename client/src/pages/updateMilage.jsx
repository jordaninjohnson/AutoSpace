import React, { useContext } from "react";
import API from "../utils/API";
import { AuthContext } from "../utils/authContext";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from '../components/Navbar copy';
import NavbarLink from '../components/NavbarLink';
import ActionBtn from '../components/ActionBtn';
import UserInfo from '../components/UserInfo';
import CarInfoBox from "../components/CarInfoBox"
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormInputTwo from "../components/FormInputTwo";

export default function Members(props) {
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
                    <h1 className='garagePageTitle'>Update milage</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='carInfoBox'>
                        <span className='carBoxTopInfo'>
                            <img className='carBoxImg' src={userVehicle.imageUrl} alt='Vehicle' />
                            <div>
                                <h2 className='carBoxTitle'>{userVehicle.year} {userVehicle.make} {userVehicle.model}</h2>
                                <p className='carBoxText'>Current Milage: {userVehicle.mileage}</p>
                                <p className='carBoxText'>Vin: {userVehicle.vin}</p>
                                <FormInputTwo setWidth='width65' name='Milage' type='number' label='New Milage' id="year"></FormInputTwo>
                            </div>
                        </span>
                        <br></br>
                        <span className='carBoxMoreInfo'>
                            <div>
                                <p className='carBoxText'>Condition: {userVehicle.condition}</p>
                                <p className='carBoxText'>Accidents: {userVehicle.accidents}</p>
                            </div>
                            <div className='carBoxLinkContainer'>
                                <Link to={`/NewMaintenance/${userVehicle.id}`}>
                                    <p className='carBoxLink'>Save</p>
                                </Link>
                            </div>
                        </span>
                    </div>
                </div>
                <div className='garageSidebar'></div>
            </div>
        </div>
    );
}
