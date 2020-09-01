import React, { useContext } from "react";
import API from "../utils/API";
import './members.css';
import { AuthContext } from "../utils/authContext";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from '../components/Navbar copy';
import NavbarLink from '../components/NavbarLink';
import ActionBtn from '../components/ActionBtn';
import UserInfo from '../components/UserInfo';
import CarInfoBox from "../components/CarInfoBox"
import { Form } from "react-bootstrap";

export default function Members() {
  const [userId, setUserId] = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [userVehicles, setVehicle] = useState([]);
  const signOut = () => { setUserId({ showNotification: true }); localStorage.removeItem("jwt.Token"); }
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    API.allVehicles(JSON.parse(localStorage.getItem("jwt.Token")).id)
      .then(res => {
        setVehicle([
          ...userVehicles,
          ...res.data
        ])
        if (Notification.permission === "granted" && userId.showNotification === true) {
          // navigator.serviceWorker.getRegistration().then(reg => {
          //   reg.showNotification("You have " + res.data.length + " vehicles in your garage.");
          // });
          console.log("my notification");
          setUserId({ showNotification: false });
        }
      })
      .catch(err => {
        console.log(err);
      });

    API.userData(JSON.parse(localStorage.getItem("jwt.Token")).id)
      .then(res => {
        setUserInfo(
          ...res.data
        )
      })
      .catch(err => {
        console.log(err);
      });

  }, [])


  if (!didMount) {
    return null;
  }

  return (
    <>
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
          <UserInfo userInfo={userInfo} />
        </div>
        <div className='garageMain'>
          <h1 className='garagePageTitle'>My Garage</h1>
          <br></br>
          <br></br>
          <br></br>
          {userVehicles.map(vehicles => (
            <div key={vehicles.id}>
              <CarInfoBox
                vehicle={vehicles}
              />
            </div>
          ))}
        </div>
        <div className='garageSidebar'></div>
      </div>
    </>
  );
}
