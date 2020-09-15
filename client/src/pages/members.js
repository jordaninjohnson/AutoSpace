import Message from "../components/Message";
import React, { useContext, useState, useEffect } from "react";
import API from "../utils/API";
import './members.css';
import { AuthContext } from "../utils/authContext";
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
  const signOut = () => { setUserId({ showNotification: true }); localStorage.clear(); window.location.reload(); }
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    //it will add all the vehicles inside of localstorage offline when online
    window.addEventListener("online", () => {
      if (JSON.parse(localStorage.getItem("offline"))) {
        const info1 = ["Syncing your offline vehicles with database.", "warning", "animate__shakeX", "animate__fadeOut"]
        Message(info1);
        const temp = JSON.parse(localStorage.getItem("offline"));
        for (let i = 0; i < temp.length; i++) {
          API.newVehicle(temp[i]);
        }
        localStorage.removeItem("offline");
        const info2 = ["Sync complete.", "warning", "animate__shakeX", "animate__fadeOut"]
        Message(info2);
      }
    });

    setDidMount(true);
    API.allVehicles(JSON.parse(localStorage.getItem("jwt.Token")).id)
      .then(res => {
        setVehicle([
          ...res.data
        ])
        localStorage.setItem("vehicles", JSON.stringify(res.data));
        if (Notification.permission === "granted" && userId.showNotification === true) {
          // navigator.serviceWorker.getRegistration().then(reg => {
          //   reg.showNotification("You have " + res.data.length + " vehicles in your garage.");
          // });
          console.log("my notification");
          setUserId({ showNotification: false });
        }
      })
      .catch(err => {
        if (JSON.parse(localStorage.getItem("vehicles")) && err.message === "Network Error") {
          const data = JSON.parse(localStorage.getItem("vehicles"));
          setVehicle([
            ...data
          ])
          const userData = JSON.parse(localStorage.getItem("user"));
          setUserInfo(
            ...userData
          )
          const info = [err.message + ". Displaying saved vehicles before offline.", "danger", "animate__shakeX", "animate__fadeOut"]
          Message(info);
        } else if (JSON.parse(localStorage.getItem("vehicles"))) {
          const data = JSON.parse(localStorage.getItem("vehicles"));
          setVehicle([
            ...data
          ])
          const userData = JSON.parse(localStorage.getItem("user"));
          setUserInfo(
            ...userData
          )
          const info = [err.message, "danger", "animate__shakeX", "animate__fadeOut"]
          Message(info);
        } else {
          const info = [err.message, "danger", "animate__shakeX", "animate__fadeOut"]
          Message(info);
        }
      });

    API.userData(JSON.parse(localStorage.getItem("jwt.Token")).id)
      .then(res => {
        setUserInfo(
          ...res.data
        )
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(err => console.log(err));

  }, [setUserId, userId.showNotification])


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
      </div>
    </>
  );
}
