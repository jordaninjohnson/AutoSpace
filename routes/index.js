const app = require("express");
const router = app.Router();

const login = require("./login.routes");
const signUp = require("./signup");
const member = require("./member");
const maintenance = require("./maintenance");
const vehicle = require("./vehicle");
const updateMileage = require("./updateMileage");
const getlocation = require("./getlocation");
const deleteVehicle = require("./deleteVehicle")

router.use(login);
router.use(signUp);
router.use(member);
router.use(maintenance);
router.use(vehicle);
router.use(updateMileage);
router.use(getlocation);
router.use(deleteVehicle);

module.exports = router;
