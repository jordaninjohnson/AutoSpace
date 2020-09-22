import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

export default {
    loginUser: function (user) {
        return axios.post("/api/login", user)
            .then(res => {
                localStorage.setItem("jwt.Token", JSON.stringify(res.data));
                setAuthorizationToken(res.data.token);
                return res;
            });
    },
    signUp: function (data) {
        return axios.post("/api/signup", data)
            .then(res => {
                localStorage.setItem("jwt.Token", JSON.stringify(res.data));
                setAuthorizationToken(res.data.token);
                return res;
            });
    },
    newVehicle: function (data) {
        return axios.post("/api/postVehicle", data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    maintRecord: function (data) {
        return axios.post("/api/maintenance/:id", data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    allVehicles: function (data) {
        return axios.get("/vehiclefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        }).then(res => {
            return res;
        })
    },
    userData: function (data) {
        return axios.get("/api/user_data/" + data)
    },
    vehicleById: function (data) {
        return axios.get("/vehicleOnefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    getMaintRecords: function (data) {
        return axios.get("/maintenancefindvehicle/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    getOneMaintRecord: function (data) {
        return axios.get("/maintenancefind/" + data, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt.Token")).token
            }
        })
    },
    updateMileage: function (data) {
        return axios.post("/api/mileage", data);
    },
    deleteVehicle: function (data) {
        return axios.delete("/api/vehicles", { params: { id: data } });
    },
    getLocation: coordinates => {
        return axios.post("/api/location/", coordinates);
    }
}


