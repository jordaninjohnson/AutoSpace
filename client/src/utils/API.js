import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";



const serverUrl = "";
// const serverUrl = "http://localhost:8080";



export default {
    // Post Routes
    loginUser: function (user) {
        return axios.post(serverUrl + "/api/login", user)
            .then(res => {
                localStorage.setItem("jwt.Token", JSON.stringify(res.data));
                setAuthorizationToken(res.data.token);
                return res;
            });
    },
    signUp: function (data) {
        return axios.post(serverUrl + "/api/signup", data)
            .then(res => {
                localStorage.setItem("jwt.Token", JSON.stringify(res.data));
                setAuthorizationToken(res.data.token);
                return res;
            });
    },
    newVehicle: function (data) {
        return axios.post(serverUrl + "/api/postVehicle", data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    maintRecord: function (data) {
        return axios.post(serverUrl + "/api/maintenance/:id", data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },

    // Get Routes
    allVehicles: function (data) {
        // Data is equal to user Id
        return axios.get(serverUrl + "/vehiclefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        }).then(res => {
            // console.log(res)
            return res;
        })
    },
    userData: function (data) {
        return axios.get(serverUrl + "/api/user_data/" + data)
    },
    vehicleById: function (data) {
        // Data is Equal to Vehicle Id
        return axios.get(serverUrl + "/vehicleOnefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    getMaintRecords: function (data) {
        // Data is Equal to vehicle Id
        return axios.get(serverUrl + "/maintenancefindvehicle/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    getOneMaintRecord: function (data) {
        return axios.get(serverUrl + "/maintenancefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    updateMileage: function (data) {
        return axios.post(serverUrl + "/api/mileage", data);
    },
    getLocation: coordinates => {
        return axios.post(serverUrl + "/api/location/", coordinates);
    }
}


