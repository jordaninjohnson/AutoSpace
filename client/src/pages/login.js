import Message from "../components/Message";
import React, { useState } from "react";
import './login.css';
import API from "../utils/API";
import { withRouter } from "react-router-dom";
import Navbar from '../components/Navbar copy';
import NavbarInput from '../components/NavbarInput';
import ActionBtn from '../components/ActionBtn';
import BulletPoint from '../components/BulletPoint';
import FormInputTwo from '../components/FormInputTwo'
import ImageUpload from '../components/imageUpload/imageUpload';
import { app } from "../utils/base";
import { Form, Spinner } from "react-bootstrap";
const db = app.firestore();

function Login(props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const [spinner, setSpinner] = useState("d-none");
  const [disable, setDisable] = useState("");
  const [signup, setSignup] = useState("Sign Up");
  const [file, setFile] = useState({});

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: emailInput.trim(),
      password: passwordInput.trim()
    }
    if (!emailInput || !passwordInput) {
      const info = ["Enter email and password!", "danger", "animate__shakeX", "animate__fadeOut"]
      Message(info);
      return;
    }
    API.loginUser(user)
      .then(() => {
        props.history.push("/Members");
        const info = ["Logged-in", "success", "animate__bounceIn", "animate__bounceOut"]
        Message(info);
      })
      .catch(err => {
        switch (err.message) {
          case "Request failed with status code 401":
            const case1 = [err.response.data.message, "danger", "animate__shakeX", "animate__fadeOut"]
            Message(case1);
            break;
          case "Network Error":
            const case2 = ["No internet!", "danger", "animate__shakeX", "animate__fadeOut"]
            Message(case2);
            break;
          default:
        }
      });
  };

  const handleSignUpSubmit = async event => {
    event.preventDefault();
    let user = {
      email: email.trim(),
      password: password.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      location: location.trim(),
      imageUrl: ""
    }
    if (!email || !password || !firstName || !lastName || !location) {
      const info = ["Please fill out all the required fields!", "warning", "animate__shakeX", "animate__fadeOut"]
      Message(info);
      return;
    }
    if (navigator.onLine && file.name) {
      setDisable("true");
      setSpinner("");
      setSignup("Uploading...");
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      user.imageUrl = await fileRef.getDownloadURL();
      setDisable("");
      setSpinner("d-none");
      setSignup("Upload complete");
    }
    API.signUp(user)
      .then(() => {
        props.history.push("/Members")
        const info = ["Signed-up and logged-in", "success", "animate__bounceIn", "animate__bounceOut"]
        Message(info);
      })
      .catch(err => {
        if (err.message === "Request failed with status code 500") {
          const info = [err.message, "danger", "animate__shakeX", "animate__fadeOut"]
          Message(info);
        } else {
          const info = [err.response.data.message, "danger", "animate__shakeX", "animate__fadeOut"]
          Message(info);
        }
      })
  };

  const handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "emailInput") {
      setEmailInput(value);
    }
    if (name === "passwordInput") {
      setPasswordInput(value)
    }
    if (name === "email") {
      setEmail(value)
    }
    if (name === "password") {
      setPassword(value)
    }
    if (name === "firstName") {
      setFirstName(value)
    }
    if (name === "lastName") {
      setLastName(value)
    }
    if (name === "location") {
      setLocation(value)
    }
    if (!email || !password) {
      return;
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <Navbar>
        <div></div>
        <Form inline onSubmit={handleLogInSubmit}>
          <NavbarInput handleInputChange={handleInputChange} value={emailInput} name='emailInput' type='emailInput' label='Username' id="emailInput" />
          <NavbarInput handleInputChange={handleInputChange} value={passwordInput} name='passwordInput' type='password' label='Password' id="passwordInput" />
          <ActionBtn handleClick={handleLogInSubmit}>Login</ActionBtn>
        </Form>
      </Navbar>
      <h1 className='mainHeader'>MyAutoSpace</h1>
      <br></br>
      <Form onSubmit={handleSignUpSubmit}>
        <div className='signInFlex'>

          <div className='signUpWrapper'>
            <h2 className='signUpHeader'>Stay Informed, Maintain and Show off Your Automobile</h2>
            <span className='flex'>
              <FormInputTwo handleInputChange={handleInputChange} value={firstName} setWidth='width40' name='firstName' type='firstName' label='First Name' id='firstName'></FormInputTwo>
              <FormInputTwo handleInputChange={handleInputChange} value={lastName} setWidth='width40' name='lastName' type='lastName' label='Last Name' id='lastName'></FormInputTwo>
            </span>
            <FormInputTwo handleInputChange={handleInputChange} value={email} setWidth='width100' name='email' type='email' label='Email' id='email'></FormInputTwo>
            <FormInputTwo handleInputChange={handleInputChange} value={password} setWidth='width100' name='password' type='password' label='Password' id='password'></FormInputTwo>
            <FormInputTwo handleInputChange={handleInputChange} value={location} setWidth='width100' name='location' type='location' label='Location' id='location'></FormInputTwo>
            <span>
              <label className='photoFileLabel'>Add Profile Image</label>
              <ImageUpload onFileChange={onFileChange} />
            </span>
            <ActionBtn handleClick={handleSignUpSubmit} disabled={disable}>{signup}<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" className={spinner} /></ActionBtn>
          </div>

          <div className='width40'>
            <BulletPoint src={require('../components/BulletPoint/img/wrenches.png')}>Keep track of the work you do on your vehicle</BulletPoint>
            <BulletPoint src={require('../components/BulletPoint/img/speedo.png')}>See upcoming maintenance needed to maintain your vehicle</BulletPoint>
            <BulletPoint src={require('../components/BulletPoint/img/chat.png')}>Connect with other vehicle owners and share information</BulletPoint>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default withRouter(Login);
