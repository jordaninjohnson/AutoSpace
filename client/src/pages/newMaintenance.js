import Message from "../components/Message";
import React, { Component } from "react";
import './newMaintenance.css';
import API from "../utils/API";
import FormInputTwo from "../components/FormInputTwo";
import { withRouter } from "react-router-dom";
import Navbar from '../components/Navbar copy';
import NavbarLink from '../components/NavbarLink';
import ActionBtn from '../components/ActionBtn';
import MaintInfoBox from "../components/MaintInfoBox";
import ImageUpload from '../components/imageUpload/imageUpload';
import { app } from "../utils/base";
import { Form, Spinner } from "react-bootstrap";
const db = app.firestore();

class NewMaintenance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      maintToAdd: {
        name: "",
        description: "",
        milage: "",
        parts: "",
        jobDate: "",
        imageUrl: "",
        VehicleId: ""
      },
      year: "",
      day: "",
      month: "",
      vehicle: [],
      button: "Add Maintenance",
      disable: "",
      spinner: "d-none",
      file: {}
    };
  };
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.id;
    this.setState({
      maintToAdd: {
        ...this.state.maintToAdd,
        [name]: value
      }
    });
  };
  handleSelect = event => {
    let value = event.target.value;
    const name = event.target.id;

    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = async (e) => {
    e.preventDefault();
    let newMaint = this.state.maintToAdd;
    newMaint.VehicleId = this.state.vehicleID;
    if (!this.state.maintToAdd.name || !this.state.maintToAdd.milage || !this.state.maintToAdd.description || !this.state.maintToAdd.jobDate) {
      const info = ["Please fill out all the required fields!", "warning", "animate__shakeX", "animate__fadeOut"]
      Message(info);
      return;
    }
    if (navigator.onLine) {
      this.setState({
        disable: "true",
        button: "Uploading...",
        spinner: ""
      });
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(this.state.file.name);
      await fileRef.put(this.state.file);
      newMaint.imageUrl = await fileRef.getDownloadURL();
      this.setState({
        disable: "",
        button: "Upload complete",
        spinner: "d-none"
      });
    }
    API.maintRecord(newMaint)
      .then(() => {
        this.props.history.push(`/Vehicles/${this.state.maintToAdd.VehicleId}`)
      })
      .catch(err => {
        console.log(err);
      })
    await db.collection("users").doc("maintenance").set({
      image: this.state.maintToAdd.imageUrl,
    });
  };

  onFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  componentDidMount() {
    let location = this.props.match.params.id;
    this.setState({
      vehicleID: location
    }, () => {
      this.apiCall()
    })
  };

  apiCall = () => {
    API.vehicleById(this.state.vehicleID)
      .then((res) => {
        this.setState({
          vehicle: res.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  };
  signOut = () => { localStorage.clear(); window.location.reload(); }

  render() {
    return (
      <>
        <Navbar>
          <div></div>
          <Form inline>
            <NavbarLink url='/members'>My Garage</NavbarLink>
            <NavbarLink url='/vehicles'>Add Vehicle</NavbarLink>
            <ActionBtn handleClick={this.signOut}>Sign Out</ActionBtn>
          </Form>
        </Navbar>
        <br></br>
        <br></br>
        <br></br>
        <div className='maintFlex'>
          <div className='addMaintenanceWrapper'>
            <h1 className='addMaintHeader'>New Maintenance</h1>
          </div>
          <div className='addMaintenanceWrapper'>
            <MaintInfoBox vehicle={this.state.vehicle} carMilage={this.state.vehicle.mileage} carVin={this.state.vehicle.vin} carYear={this.state.vehicle.year} carMake={this.state.vehicle.make} carModel={this.state.vehicle.model} />
          </div>
        </div>
        <br></br>
        <Form>
          <div className='maintFlex'>
            <div className='addMaintenanceWrapper'>
              <span>
                <label className='photoFileLabel'>Add Photo</label>
                <ImageUpload onFileChange={this.onFileChange} />
              </span>
              <FormInputTwo setWidth='width100' name='jobName' placeholder="" type='text' label='Job Name' id="name" value={this.state.maintToAdd.name} handleInputChange={this.handleInputChange}></FormInputTwo>
              <FormInputTwo setWidth='width100' name='milage' type='text' label='Milage at Service' id="milage" value={this.state.maintToAdd.milage} handleInputChange={this.handleInputChange}></FormInputTwo>
              <div className="width100">
                <span className="floatingLabelFocus">Service Date</span>
                <input
                  placeholder="YYYY-MM-DD"
                  type="date"
                  className="inputText"
                  name="jobDate"
                  value={this.state.maintToAdd.jobDate}
                  onChange={this.handleInputChange}
                  id="jobDate"
                />
              </div>
            </div>
            <div className='addMaintenanceWrapper'>
              <textarea className='inputText textArea maintAddTextArea' placeholder='Description' name='description' type='text' label='Description' id="description" value={this.state.description} onChange={this.handleInputChange} />
            </div>
          </div>
          <br />
          <div className='maintFlex'>
            <div className='addMaintenanceWrapper'>
              <ActionBtn handleClick={this.handleFormSubmit} disabled={this.state.disable}>{this.state.button}<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" className={this.state.spinner} /></ActionBtn>
            </div>
          </div>
        </Form>
      </>
    );
  }
}
export default withRouter(NewMaintenance);